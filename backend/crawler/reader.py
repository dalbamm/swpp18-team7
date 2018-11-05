fo = open('result.json', 'rb', 1)
print ("Name of the file: ", fo.name)
print ("Opening mode : ", fo.mode)
print ("")

print ("## read file ##")
s = fo.read(1000)
print(s)

print ("")
print ("Close file")
fo.close()
print ("Closed or not : ", fo.closed)
