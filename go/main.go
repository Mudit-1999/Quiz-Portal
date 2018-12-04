package main

import (
	"fmt"
	"crypto/sha256"
	"encoding/hex"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_"github.com/jinzhu/gorm/dialects/sqlite"
)

var db *gorm.DB
var err error

type Genre struct {
	Id        uint   `json:"id";gorm:"primary_key"`
	GenreName string `json:"genre_name";grom:"type:varchar(100);unique"`
}

type Quiz struct {
	Id      uint   `json:"id";gorm:"primary_key"`
	GenreId  string `json:"genre_id"`
	Qz_Name string `json:"qz_name"`
}

type Question struct {
	Id       uint   `json:"id";gorm:"primary_key"`
	GenreId  string `json:"genre_id"`
	QzId 	 string `json:"qz_id"`
	Ques     string `json:"ques"`
	Opt1  	 string `json:"opt1"`
	Opt2  	 string `json:"opt2"`
	Opt3  	 string `json:"opt3"`
	Opt4  	 string `json:"opt4"`
	Opt1Chk	 string  `json:opt1chk`
	Opt2Chk	 string `json:opt2chk`
	Opt3Chk	 string  `json:opt3chk`
	Opt4Chk	 string  `json:opt4chk`
}

type Users struct {
	Id         uint   `json:"id";gorm:"primary_key"`
	FirstName   string `json:"f_name"`
	LastName    string `json:"l_name"`
	Email    	string `gorm:"type:varchar(100) unique" json:"email"`
	Pwd 		string `json:"pwd"`
}

type UserStats struct {
	Id      uint   `json:"id";gorm:"primary_key"`
	Score   uint   `json:"score"`
	QzId  string   `json:"qz_id"`
	UsrEmail string   `json:"usr_email"`
	GenreId string `json:"genre_id"`
}



func main() {
	db, err = gorm.Open("sqlite3", "./quiz_portal.db")
	defer db.Close()
	db.AutoMigrate(&Genre{}, &Quiz{}, &Question{}, &Users{}, &UserStats{})
	r := gin.Default()
	//  genre !!!
	r.GET("/genre/", GetGenres)
	r.POST("/genre/", CreateGenre)
	r.DELETE("/genre/:id", DeleteGenre)

	// quiz  !!!
	r.POST("/quiz/:id", AddQuiz)
	r.GET("/quiz/:id", GetQuizzes)
	r.DELETE("/quiz/:id", DeleteQuiz)

	// question !!!
	r.POST("/question/:g_id/:q_id", AddQuestion)
	r.GET("/question/:id/:id1", GetQuestions)
	r.DELETE("/question/:id", DeleteQuestion)
	r.PUT("/question/:id", UpdateQuestion)
	r.GET("/question/:id", GetAQuestion)


	// User Registers!!
	r.POST("/signup/", AddUser)
	r.POST("/signin/", SignUser)

	r.POST("/userstat/", AddUserStat)
	r.PUT("/userstat/:id", ChangeUserStat)
	r.GET("/userstat/:id", GetUserStat)
	
	// admin only 
	r.GET("/euser/:usr", Euser)              
	r.GET("/user/", GetAllUsers)              
	r.DELETE("/user/:id", DeleteUser)
	r.Use((cors.Default()))
	r.Run(":5004")
}

func CreateGenre(c *gin.Context) {
	var genre Genre
	var fgenre []Genre
	c.BindJSON(&genre)
	c.Header("access-control-allow-origin", "*")
	err:= db.Where("genre_name = ?", genre.GenreName).Find(&fgenre).Error
	if err == nil{
		if len(fgenre) == 0 {
			db.Create(&genre)
			c.JSON(200, genre)
			fmt.Println(genre)
		}else{
			c.JSON(401,gin.H{"error ":	"genre already exits"})
		}
	}else{
		fmt.Println(err)
	}
}

func GetGenres(c *gin.Context) {
	var genres []Genre
	if err := db.Find(&genres).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, genres)
	}
}

func DeleteGenre(c *gin.Context) {
	var genre Genre
	var qzs []Quiz
	var quess []Question
	genre_id := c.Params.ByName("id")
	// db.Where("id = ?", id).Find(&genre)
	// db.Where("genre_id = ?", id).Find(&qzs)
	// db.Where("genre_id = ?", id).Find(&quess)
	db.Where("id = ?", genre_id).Delete(&genre)
	db.Where("genre_id = ?", genre_id).Delete(&qzs)
	db.Where("genre_id = ?", genre_id).Delete(&quess)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"id #" + genre_id: "deleted"})
}



func AddQuiz(c *gin.Context) {
	var quiz Quiz
	var fquiz []Quiz
	c.BindJSON(&quiz)
	fmt.Println(quiz)
	err:= db.Where("qz_name = ?", quiz.Qz_Name).Where("genre_id = ?", quiz.GenreId).Find(&fquiz).Error
	c.Header("access-control-allow-origin", "*")
	if err == nil{
		if len(fquiz) == 0 {
			db.Create(&quiz)
			c.JSON(200, quiz)
			fmt.Println(quiz)
		}else{
			c.JSON(401,gin.H{"error ":	"quiz already exits"})
		}
	}else{
		fmt.Println(err)
	}
}

func GetQuizzes(c *gin.Context) {
	id := c.Params.ByName("id")
	var quizzes []Quiz
	err := db.Where("genre_id = ?", id).Find(&quizzes).Error; 
	if err != nil {
		c.JSON(404,err)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, quizzes)
	}
}

func DeleteQuiz(c *gin.Context) {
	var qzs Quiz
	var quess []Question
	qz_id:= c.Params.ByName("id")
	// db.Where("id = ?", id).Delete(&qzs)
	// db.Where("qz_id = ?", id).Delete(&quess)
	db.Where("id = ?", qz_id).Delete(&qzs)
	db.Where("qz_id = ?",qz_id).Delete(&quess)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"id #" + qz_id: "deleted from Quiz and Questions"})
}



func AddUser(c *gin.Context) {
	var user Users
	var fuser []Users
	c.BindJSON(&user)
	c.Header("access-control-allow-origin", "*")
	err:= db.Where("email = ?", user.Email).Find(&fuser).Error
	if err == nil{
		if len(fuser) == 0 {

			hp:=sha256.New()
			hp.Write([]byte(user.Pwd))
			user.Pwd=hex.EncodeToString(hp.Sum(nil))
			db.Create(&user)
			c.JSON(200, user)
			fmt.Println(user)
		}else{
		c.JSON(401,gin.H{"id #" + user.Email :	"user already exits"})
		}
	}else{
		fmt.Println(err)
	}
}

// sign in 
func SignUser(c *gin.Context) {
	var user Users
	var fuser []Users
	c.BindJSON(&user)
	fmt.Println(user)

	hp:=sha256.New()
	hp.Write([]byte(user.Pwd))
	user.Pwd=hex.EncodeToString(hp.Sum(nil))

	c.Header("access-control-allow-origin", "*")
	err := db.Where("email = ?", user.Email).Where("pwd = ?", user.Pwd).Find(&fuser).Error
	if err == nil{
		if len(fuser) == 1 {
			c.JSON(200,user)
			fmt.Println(fuser)

		}else{
		c.JSON(401, gin.H{"error": "email id not found"})
		}
	}else{
		fmt.Println(err)
	}
}

func Euser(c *gin.Context) {
	id := c.Params.ByName("usr")
	var user Users
	err:= db.Where("email= ?", id).First(&user).Error;
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	if err != nil {
	   c.AbortWithStatus(404)
	   fmt.Println(err)
	} else {
	   c.JSON(200, user)
	}
 }


func GetAllUsers(c *gin.Context) {
	var users []Users
	err := db.Find(&users).Error;
	if err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, users)
	}
}

func DeleteUser(c *gin.Context) {
	id := c.Params.ByName("id")
	var user Users
	db.Where("id = ?", id).Delete(&user)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"id #" + id: "deleted"})
}



func AddQuestion(c *gin.Context) {
	var aques Question
	var fques []Question
	c.BindJSON(&aques)
	c.Header("access-control-allow-origin", "*")
	err:= db.Where("qz_id = ?", aques.QzId).Where("genre_id = ?", aques.GenreId).Where("ques = ?", aques.Ques).Find(&fques).Error

	if err == nil{
		if len(fques) == 0 {
			db.Create(&aques)
			c.JSON(200, aques)
			fmt.Println(aques)
		}else{
		c.JSON(401,gin.H{"error":"user already exits"})
		}
	}else{
		fmt.Println(err)
	}

}

func GetQuestions(c *gin.Context) {
	id := c.Params.ByName("id")   // genre_id
	id1 := c.Params.ByName("id1") // quiz_id
	var questions []Question
	c.Header("access-control-allow-origin", "*")
	if err := db.Where("genre_id = ?", id).Where("qz_id = ?", id1).Find(&questions).Error; err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.JSON(200, questions)
	}
}

func DeleteQuestion(c *gin.Context) {
	ques_id := c.Params.ByName("id")
	var question Question
	db.Where("id = ?", ques_id).Delete(&question)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, gin.H{"id #" + ques_id: "deleted"})
}

func UpdateQuestion(c *gin.Context){
	var quess Question
	id := c.Params.ByName("id")

	err := db.Where("id = ?", id).First(&quess).Error; 
	if err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	 }else{
	 	c.BindJSON(&quess)
	 	db.Save(&quess)
	 	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	 	c.JSON(200, quess)
	 }
  }

func GetAQuestion(c *gin.Context) {
	id := c.Params.ByName("id")
	var quess Question
	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	err := db.Where("id = ?", id).First(&quess).Error; 
	if err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	 }else {
	   c.JSON(200, quess)
		fmt.Println(quess)
	}
}


func AddUserStat(c *gin.Context) {
	var userst UserStats;
	var fuserst []UserStats;
	c.BindJSON(&userst)
	c.Header("access-control-allow-origin", "*")
	err:= db.Where("usr_email = ?", userst.UsrEmail).Find(&fuserst).Error
	if err == nil{
		if len(fuserst) == 0 {
			db.Create(&userst)
			c.JSON(200, userst)
			fmt.Println(userst)
		}else{
		c.JSON(401,gin.H{"error":	"user has already taken quiz"})
		}
	}else{
		fmt.Println(err)
	}
}

func ChangeUserStat(c *gin.Context){
	var userst UserStats;
	eid := c.Params.ByName("id")
	err:= db.Where("usr_email = ?",eid).First(&userst).Error
	if err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	 }else{
		c.BindJSON(&userst)
	 	db.Save(&userst)
	 	c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
	 	c.JSON(200, userst)
	 }
}


func GetUserStat(c *gin.Context) {
	eid := c.Params.ByName("id")
	var userst []UserStats;
	err := db.Where("usr_email= ?", eid).Find(&userst).Error;
	if err != nil {
		c.AbortWithStatus(404)
		fmt.Println(err)
	} else {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, userst)
	}
}