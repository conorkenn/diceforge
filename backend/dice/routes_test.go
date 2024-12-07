package dice

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestDiceRoutes(t *testing.T) {
	gin.SetMode(gin.TestMode)
	router := gin.Default()

	DiceRoutes(router)

	t.Run("Roll Empty Request", func(t *testing.T) {
		req, _ := http.NewRequest(http.MethodPost, "/roll", nil)
		req.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()

		router.ServeHTTP(w, req)

		assert.Equal(t, http.StatusBadRequest, w.Code)
	})

	t.Run("Roll Invalid Request", func(t *testing.T) {
		invalidRequest := `{"sides": 20, "advantage": true, "disadvantage": true}`
		req, _ := http.NewRequest(http.MethodPost, "/roll", strings.NewReader(invalidRequest))
		req.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()

		router.ServeHTTP(w, req)

		assert.Equal(t, http.StatusBadRequest, w.Code)
	})

	t.Run("Roll valid Request", func(t *testing.T) {
		invalidRequest := `{"sides": 20, "advantage": true}`
		req, _ := http.NewRequest(http.MethodPost, "/roll", strings.NewReader(invalidRequest))
		req.Header.Set("Content-Type", "application/json")
		w := httptest.NewRecorder()

		router.ServeHTTP(w, req)

		assert.Equal(t, http.StatusOK, w.Code)
	})
}
