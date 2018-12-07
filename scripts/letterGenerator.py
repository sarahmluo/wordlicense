"""
    This module contains code to generate 
    a list of threee-letter strings for the 
    Word License mobile app game based on the 
    provided dictionary.
    
    Author: Sarah Luo
    Date: 12/6/2018

"""

import json
import os.path
import re

def writeLetterCombos():
    """
        Writes a file with all valid three-letter combinations.
        'Valid' means there is a word in the dictionary corresponding
        to that letter combination.
    """

    # use os.path to generate the filepath
    data_folder = os.path.join("..", "src", "assets", "words")
    
    file_to_open = os.path.join(data_folder, "words.json")
    
    f = open(file_to_open)
    
    # Load the dictionary
    data = json.load(f);
    
    alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 
        'l', 'm', 'n', 'o', 'p',
        'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    #alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
    letters = []
    
    # prepare resulting json file
    file_to_create = os.path.join(data_folder, "letters.json")
    
    if os.path.exists(file_to_create):
        os.remove(file_to_create)
    
    g = open(file_to_create, "a")
    g.write("{")
    
    
    # loop through each three-letter combination
    # for each one, test a regular expression against 
    # the dictionary keys
    for letter1 in alphabet:
        x = letter1
        for letter2 in alphabet:
            y = letter2
            for letter3 in alphabet:
                z = letter3
                reObj = re.compile('([a-z])*' + x + '([a-z])*' + y + '([a-z])*' + z + '([a-z])*')
                for key in data.keys():
                    if(reObj.match(key)):
                        letters.append(x + y + z)
                        g.write("\"" + x + y + z + "\": 1,")
                        break
    
    g.write("}")
    print(len(letters))    
    
writeLetterCombos()