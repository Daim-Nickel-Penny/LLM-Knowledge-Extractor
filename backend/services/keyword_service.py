import spacy
from collections import Counter

nlp = spacy.load("en_core_web_sm")

def extract_keywords(text: str):
    doc = nlp(text)

    nouns = [token.text.lower() for token in doc if token.pos_ == "NOUN"]

    most_common = [word for word, _ in Counter(nouns).most_common(3)]
    
    return most_common