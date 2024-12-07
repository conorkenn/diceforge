package dice

import "github.com/gin-gonic/gin"

func DiceRoutes(router *gin.Engine) {
	router.POST("/roll", Roll)
}
