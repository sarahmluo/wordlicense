"""
    This module contains code to generate
    a word list per three letter combo 
    for the license plate game
    
    Author: Sarah Luo
    Date: 12/6/2018

"""

import json
import os.path
import re

def writeWordList():
    """
        Writes a file with a word list for each three-letter combination.
    """

    # use os.path to generate the filepath
    data_folder = os.path.join("..", "src", "assets", "words")
    
    file_to_open = os.path.join(data_folder, "words.json")
    
    dictFile = open(file_to_open)
    
    # Load the dictionary
    dictionary = json.load(dictFile);
    
    # Load the list of three letter combos
    combo_folder = os.path.join("..", "src", "assets", "words")
    
    combo_file_to_open = os.path.join(combo_folder, "letters.json")
    
    comboFile = open(combo_file_to_open)
    
    combos = json.load(comboFile)
    
    # prepare resulting json file
    file_to_create = os.path.join(data_folder, "wordList.json")
    
    if os.path.exists(file_to_create):
        os.remove(file_to_create)
    
    g = open(file_to_create, "a")
    g.write("{")
    
    
    # loop through each three-letter combination
    # for each one, find 5 words that match its Regex
    for combo in combos.keys():
        counter = 0
        g.write("\"" + combo + "\"" + ": [")
        x = combo[0]
        y = combo[1]
        z = combo[2]
        reObj = re.compile('([a-z])*' + x + '([a-z])*' + y + '([a-z])*' + z + '([a-z])*')        
        for word in dictionary.keys():
            if(reObj.match(word)):
                if (len(word) <= 7):
                    counter += 1
                    if(counter == 1):
                        g.write("\"" + word + "\"")
                    elif(counter == 10):
                        g.write("," + "\"" + word + "\"")
                        break;
                    else:
                        g.write("," + "\"" + word + "\"")
        g.write("],\n")
    
    g.write("}")
    
def writeLetters2():
    """
        Writes three-letter combo file based on number of 
        corresponding words in the dictionary
    """

    # use os.path to generate the filepath
    data_folder = os.path.join("..", "src", "assets", "words")
    
    file_to_open = os.path.join(data_folder, "wordList.json")
    
    wordListFile = open(file_to_open)
    
    # Load the dictionary
    wordList = json.load(wordListFile);
    
    # prepare resulting json file
    file_to_create = os.path.join(data_folder, "letters2.json")
    
    if os.path.exists(file_to_create):
        os.remove(file_to_create)
    
    g = open(file_to_create, "a")
    g.write("{")
    counter = 0
    
    
    # loop through each three-letter combination
    # for each one, find 5 words that match its Regex
    for key in wordList.keys():
        words = wordList[key]
        if(len(words) > 3):
            counter += 1
            g.write("\"" + key + "\": 1,")

    
    g.write("}")
    print(counter)
    
#writeWordList()
writeLetters2()
