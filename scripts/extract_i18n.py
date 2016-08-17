#!/usr/bin/env python3
import sys
import re

def extract(x):
    matches_ = re.search(r't\(\'(.*)\'\)', x)
    if not matches_:
        return ''
    for g in matches_.groups():
        return g
    
for li in sys.stdin:
    m = extract(li)
    if m:
        print(m)



