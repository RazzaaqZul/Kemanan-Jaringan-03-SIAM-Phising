package main

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func loadRoutes(app *gin.Engine, sql *gorm.DB) {
	// controller
	user := NewUserController(sql)

	// routes
	app.POST("/siam", user.LoginController)
}