package dice

import (
	"math/rand"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

type Dice struct {
	Sides        int      `json:"sides"`
	Advantage    bool     `json:"advantage,omitempty"`
	Disadvantage bool     `json:"disadvantage,omitempty"`
	Modifiers    []string `json:"modifiers,omitempty"`
}

func Roll(c *gin.Context) {
	var newDice Dice
	var r = rand.New(rand.NewSource(time.Now().UnixNano()))

	if err := c.BindJSON(&newDice); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if newDice.Advantage && newDice.Disadvantage {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Can't have both advantage and disadvantage"})
	}

	result := r.Intn(newDice.Sides) + 1

	if newDice.Advantage {
		result = max(result, r.Intn(newDice.Sides)+1)
	}
	if newDice.Disadvantage {
		result = min(result, r.Intn(newDice.Sides)+1)
	}
	message := "Successfully rolled dice"

	if result == newDice.Sides {
		message = "Critical Success"
	}

	if result == 1 {
		message = "Critical Failure"
	}

	if len(newDice.Modifiers) > 0 {
		result = applyModifiers(result, newDice.Modifiers)
	}

	c.JSON(http.StatusOK, gin.H{
		"result":  result,
		"message": message,
	})
}

func applyModifiers(result int, modifiers []string) int {
	for _, modifier := range modifiers {
		if strings.Contains(modifier, "d") {
			parts := strings.Split(modifier, "d")
			if len(parts) != 2 {
				continue
			}
			diceCount, err := strconv.Atoi(parts[0])
			if err != nil {
				continue // invalid number
			}
			diceSides, err := strconv.Atoi(parts[1])
			if err != nil {
				continue // invalid number
			}

			for i := 0; i < diceCount; i++ {
				result += rand.Intn(diceSides) + 1
			}
		} else {
			modifierInt, err := strconv.Atoi(modifier)
			if err != nil {
				continue //invalid number
			}

			result += modifierInt
		}
	}

	return result
}