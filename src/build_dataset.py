import numpy as np
import pandas as pd
import os

current_dir = os.path.dirname(__file__)

aneks_1 = None
aneks_1_path = os.path.join(current_dir, '..', 'data', 'raw', 'aneks_1.txt')
# анекдоты трахтенберга
with open(aneks_1_path) as f:
  aneks_1 = np.array(f.read().split(';'))

aneks_1 = np.reshape(aneks_1, shape=(aneks_1.shape[0], ))
ones = np.ones((1, len(aneks_1)), dtype=int)
# df = pd.DataFrame(np.vstack((aneks_1, ones)).T, columns=['text', 'target'])
# df.head()

aneks_0 = None
aneks_0_path = os.path.join(current_dir, '..', 'data', 'raw', 'aneks_0.txt')
with open(aneks_0_path) as f:
  aneks_0 = np.array(f.read().split('\n\n'))

aneks_0 = np.reshape(aneks_0, shape=(aneks_0.shape[0], ))
zeros = np.zeros((1, len(aneks_0)), dtype=int)

t1 = np.vstack((aneks_1, ones)).T
t2 = np.vstack((aneks_0, zeros)).T
df = pd.DataFrame(np.vstack((t1, t2)), columns=['text', 'target']).sample(frac=1).reset_index(drop=True)
df.head()

dataset_path = os.path.join(current_dir, '..', 'data', 'processed', 'jokes.csv')
df.to_csv(dataset_path, index=False)