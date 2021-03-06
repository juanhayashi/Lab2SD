#!flask/bin/python
from flask import Flask, jsonify, request
import json, urllib2
app = Flask(__name__)

@app.route('/datos', methods=['POST'])
def recibir_datos():
  metodo=request.json['metodo']
  numeros=request.json['numeros']
  print "\nNumeros recibidos"
  print numeros
  if metodo=="bubblesort":
    bubbleSort(numeros)
  if metodo=="quicksort":
    quickSort(numeros)
  if metodo=="mergesort":
    mergeSort(numeros)
  print "Numeros ordenados con %s" %  metodo
  print numeros
  url = 'http://10.42.0.100:8081/send'
  postdata = {'numeros':numeros}

  req = urllib2.Request(url)
  req.add_header('Content-Type','application/json')
  data = json.dumps(postdata)

  response = urllib2.urlopen(req,data)
  print "Se enviaron numeros ordenados\n"
  return "Hola desde Python!", 201

def bubbleSort(alist):
  for passnum in range(len(alist)-1,0,-1):
    for i in range(passnum):
      if alist[i]>alist[i+1]:
        temp = alist[i]
        alist[i] = alist[i+1]
        alist[i+1] = temp


def quickSort(alist):
   quickSortHelper(alist,0,len(alist)-1)

def quickSortHelper(alist,first,last):
   if first<last:

       splitpoint = partition(alist,first,last)

       quickSortHelper(alist,first,splitpoint-1)
       quickSortHelper(alist,splitpoint+1,last)


def partition(alist,first,last):
   pivotvalue = alist[first]

   leftmark = first+1
   rightmark = last

   done = False
   while not done:

       while leftmark <= rightmark and \
               alist[leftmark] <= pivotvalue:
           leftmark = leftmark + 1

       while alist[rightmark] >= pivotvalue and \
               rightmark >= leftmark:
           rightmark = rightmark -1

       if rightmark < leftmark:
           done = True
       else:
           temp = alist[leftmark]
           alist[leftmark] = alist[rightmark]
           alist[rightmark] = temp

   temp = alist[first]
   alist[first] = alist[rightmark]
   alist[rightmark] = temp


   return rightmark

def mergeSort(alist):
    print("Splitting ",alist)
    if len(alist)>1:
        mid = len(alist)//2
        lefthalf = alist[:mid]
        righthalf = alist[mid:]

        mergeSort(lefthalf)
        mergeSort(righthalf)

        i=0
        j=0
        k=0
        while i<len(lefthalf) and j<len(righthalf):
            if lefthalf[i]<righthalf[j]:
                alist[k]=lefthalf[i]
                i=i+1
            else:
                alist[k]=righthalf[j]
                j=j+1
            k=k+1

        while i<len(lefthalf):
            alist[k]=lefthalf[i]
            i=i+1
            k=k+1

        while j<len(righthalf):
            alist[k]=righthalf[j]
            j=j+1
            k=k+1
    print("Merging ",alist)

if __name__ == "__main__":
	app.run(host="10.42.0.1",port=8082)
