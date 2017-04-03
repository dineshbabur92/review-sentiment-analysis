
# coding: utf-8

# In[16]:

import os;

import sys;
sys.path.insert(0,os.getcwd() + '..\\lib');

from Transform import GenTransform;
from Regression import LogisticRegression;



import re;
import pandas as pd;
import numpy as np;

reviewsDf= pd.read_csv(os.getcwd() +"\\datasets\\reviews_sister.csv", index_col=0, parse_dates=True, nrows= 50);

wordFreq = dict();
stopWords = ["a","about","above","after","again","against","all","am","an","and","any","are","as","at",
"be","because","been","before","being","below","between","both","but","by","could","did",
"do","does","doing","down","during","each","few","for","from","further","had","has","have",
"having","he","he'd","he'll","he's","her","here","here's","hers","herself","him","himself",
"his","how","how's","i","i'd","i'll","i'm","i've","if","in","into","is","it","it's","its",
"itself","let's","me","more","most","my","myself","of","off","on","once","only","or","other",
"ought","our","ours","ourselves","out","over","own","same","she","she'd","she'll","she's",
"should","so","some","such","than","that","that's","the","their","theirs","them","themselves",
"then","there","there's","these","they","they'd","they'll","they're","they've","this","those",
"through","to","too","under","until","up","very","was","we","we'd","we'll","we're","we've",
"were","what","what's","when","when's","where","where's","which","while","who","who's","whom",
"why","why's","with","would","you","you'd","you'll","you're","you've","your","yours","yourself",
"yourselves"];
reviews = reviewsDf.values[:,1];
words = [];
for review in reviews:
    review = re.sub('[^0-9a-zA-Z ]+', '', review);
    reviewWords = review.lower().strip().split(" ");
    for word in reviewWords:
        if(not word in stopWords):
            if(not word in wordFreq):
                wordFreq[word] = 1;
                words.append(word);
                
            else:
                wordFreq[word] += 1;
wordFreq.pop('', None);
if '' in words: words.remove('');
wordFreq = sorted(wordFreq.items(), key=lambda x:x[1], reverse = True);
count = 0;
for key in wordFreq:
    if key in words: words.remove(key);
    count = count + 1;
    if(count==100):
        break;
        
for word in words:
    reviewsDf["is_" + word] = reviewsDf["Review"].str.contains(word) * 1
reviewsDf = GenTransform.generateValueColumns(reviewsDf, ["Sentiment"]);
reviewsXColumns = [col for col in reviewsDf.columns if col not in ['positive', 'negative', 'neutral', 'ProductName', 'Review']]
reviewsX = np.matrix(reviewsDf[reviewsXColumns]);

sentiments = ["positive", "negative", "neutral"];
predictionsSentiment = np.ones((len(reviewsDf.index),1)) * -1;
i =0;
for sentiment in sentiments:
    reviewsy = np.transpose(np.matrix(reviewsDf[sentiment]));
    reviewLrIns = LogisticRegression(reviewsX, reviewsy, 0.5);
    theta, fminOutput = reviewLrIns.buildModel();
    predictedY = np.round(LogisticRegression.sigmoid(np.dot(LogisticRegression.addIntercept(reviewsX),theta)));
    predictionsSentiment = np.hstack([predictionsSentiment, predictedY]);
    i = i+1;
sentimentIndices = np.subtract(np.argmax(predictionsSentiment, axis = 1), 1).flatten().tolist()[0]
predictedSentiments = [];
for i in sentimentIndices:
    predictedSentiments.append(sentiments[i]);
finalPredictedSentiments = pd.DataFrame(np.transpose(np.matrix(predictedSentiments)));
finalPredictedSentiments.to_csv(os.getcwd() +"\\datasets\\finalPredictedSentiments.csv",
                                sep=',');

