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

	dice.DiceRoutes(router)

	router.Run(":8080")
}
