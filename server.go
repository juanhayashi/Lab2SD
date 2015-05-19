package main

import (
  "github.com/go-martini/martini"
  "github.com/martini-contrib/binding"
  "fmt"
)
type Datos struct {
	Tweet string `json:"tweet"`
}

func main() {
  m := martini.Classic()

  m.Get("/", func() string {
    return "Hola mundo!"
  })

  m.Post("/datos", binding.Bind(Datos{}), func(dato Datos) string{
    return fmt.Sprintf("Tweet desde GOlang: %s\n", dato.Tweet)
    
  })

  m.Run()
}
