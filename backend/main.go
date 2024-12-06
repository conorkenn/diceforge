package main

import (
	"diceforge-backend/dice"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	// Enable CORS
	router.Use(cors.Default())

	router.POST("/roll", dice.Roll)

	router.Run(":8080")
}
