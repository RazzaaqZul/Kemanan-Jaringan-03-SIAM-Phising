package main

import (
	"log"
	"os"
	"siam-phishing-be/db"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(".env"); err != nil {
		log.Println("load env failed: ", err)
	}

	sql, err := db.InitSQL()
	if err != nil {
		panic(err)
	}
	if err := db.AutoMigrate(sql); err != nil { panic(err) }
	
	app := gin.Default()
	
	app.Use(corsMiddleware())
	loadRoutes(app, sql)

	app.Run(":" + os.Getenv("PORT"))
}