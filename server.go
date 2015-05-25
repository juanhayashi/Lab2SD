package main

import (
  "github.com/go-martini/martini"
  "github.com/martini-contrib/binding"
  "fmt"
  "github.com/parnurzeal/gorequest"
)

type Datos struct {
	Metodo string `json:"metodo"`
	Numeros []float64 `json:"numeros"`
}

func main() {
  m := martini.Classic()
  
  m.Get("/", func() string {
    return "Hola mundo!"
  })

  m.Post("/datos", binding.Bind(Datos{}), func(dato Datos) string{
    if dato.Metodo=="bubblesort"{
      bubblesort(dato.Numeros)
    }
    if dato.Metodo=="quicksort"{
      quickSort(dato.Numeros,0,len(dato.Numeros)-1)
    }
    if dato.Metodo=="mergesort"{
      fmt.Println("aqui")
      dato.Numeros=mergeSort(dato.Numeros)
    }
    fmt.Println(dato.Numeros)
    m := Datos{dato.Metodo, dato.Numeros}

    request := gorequest.New()
    request.Post("http://10.42.0.100:8081/send").
    Set("Notes","gorequst is coming!").
    Send(m).
    End() 



    return fmt.Sprintf("Tweet desde GOlang: %s\n", dato.Metodo)
    
  })

  m.RunOnAddr("10.42.0.1:8088");
}

func bubblesort(a []float64) {
    for itemCount := len(a) - 1; ; itemCount-- {
        hasChanged := false
        for index := 0; index < itemCount; index++ {
            if a[index] > a[index+1] {
                a[index], a[index+1] = a[index+1], a[index]
                hasChanged = true
            }
        }
        if hasChanged == false {
            break
        }
    }
}

func swap(A []float64,x int,y int){
  tmp:=0.0;

  tmp=A[x];
  A[x]=A[y];
  A[y]=tmp;

}

func partition(A []float64,low int,high int) int{
  pivot := A[low];
  wall :=low;

  for i:=low+1; i <= high; i++ {
    if(A[i] < pivot){
      wall++;
      swap(A,i,wall);
    }
  }

  swap(A,low,wall);
  return wall;

}

func quickSort (A []float64,low int,high int) int{

  pivot := 0;

  if(low >= high){
    return high;
  }
  pivot=partition(A,low,high)

  //fmt.Println("pivot is ",pivot)

  quickSort(A,low,pivot)
  quickSort(A,pivot+1,high)
  return 1;
}

func mergeSort(a []float64) []float64 {

  if len(a) <= 1 {
    return a
  }
  
  left := make([]float64, 0)
  right := make([]float64, 0)
  m := len(a) / 2

  for i, x := range a {
    switch {
    case i < m:
      left = append(left, x)
    case i >= m:
      right = append(right, x)
    }
  }

  left = mergeSort(left)
  right = mergeSort(right)

  return merge(left, right)
}

func merge(left, right []float64) []float64 {

  results := make([]float64, 0)

  for len(left) > 0 || len(right) > 0 {
    if len(left) > 0 && len(right) > 0 {
      if left[0] <= right[0] {
        results = append(results, left[0])
        left = left[1:len(left)]
      } else {
        results = append(results, right[0])
        right = right[1:len(right)]
      }
    } else if len(left) > 0 {
      results = append(results, left[0])
      left = left[1:len(left)]
    } else if len(right) > 0 {
      results = append(results, right[0])
      right = right[1:len(right)]
    }
  }

  return results
}

