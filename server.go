package main

import (
	"log"
	"net/http"
)

func main() {
	// 将根路径 / 映射到 ./site 目录，自动提供 index.html 等静态文件
	http.Handle("/", http.FileServer(http.Dir("./site")))

	log.Println("Server is running on http://localhost:1145")
	log.Fatal(http.ListenAndServe(":1145", nil))
}