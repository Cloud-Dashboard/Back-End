import reflexion
from Leer import Leer as leer
import time
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

inicio = time.time()
#
url = ".\\Datasets\\COVID19.csv"
#url = ".\\Datasets\\Dengue.csv"
#url = ".\\Datasets\\Influenza.csv"
#url = ".\\Datasets\\Sarampion.csv"
grado = 60
alfa = 0.51360099729011
beta = -0.176262299002633
mLeer = leer(url)
datos = mLeer.getList()
reflexion.ejecucionX(datos, grado, alfa, beta)
fin = time.time()
print("Execution time:", fin - inicio)

x = np.arange(1, len(datos) + 1, 1)
y = mLeer.getNormalized().values[2]
y2 = reflexion.getSalidas()

##Pasar a csv
time=x
normalized = y
characterization = y2

dict = {"Time":time,"Normalized": normalized, "Characterization": characterization}

df = pd.DataFrame(dict)
df.to_csv('data.csv', index=False)

# ##Subir csv a Github

from github import Github

token = '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'
g = Github(token)
repo = g.get_user().get_repo('csv')
all_files = []
contents = repo.get_contents("")
while contents:
    file_content = contents.pop(0)
    if file_content.type == "dir":
        contents.extend(repo.get_contents(file_content.path))
    else:
        file = file_content
        all_files.append(str(file).replace('ContentFile(path="', '').replace('")', ''))
with open('data.csv', 'r') as file:
    content = file.read()
# Upload to github
git_prefix = ''
git_file = git_prefix + 'data.csv'
### THIS PART WORKS ###

### GET AN ERROR HERE BELOW ###
if git_file in all_files:
    contents = repo.get_contents(git_file)
    repo.update_file(contents.path, "committing files", content, contents.sha, branch="main")
    print(git_file + ' UPDATED')
else:
    repo.create_file(git_file, "committing files", content, branch="main")
    print(git_file + ' CREATED')


plt.plot(x, y, label='Normalized')
plt.plot(x, y2, label='Characterization')
plt.xlabel('Días')
plt.ylabel('Datos')
plt.title('Characterization')
plt.legend()
plt.show()
