import argparse
import json

def charger():
    try:
        with open("depenses.json", "r") as f:   # "r" pour lire, "w" pour écrire : lequel ?
            return json.load(f)                          # la fonction du module json qui LIT un fichier
    except FileNotFoundError:
        return []

def sauvegarder(depenses):
    with open("depenses.json", "w") as f:   # cette fois on ÉCRIT
        json.dump(depenses, f, indent=2)     # load = lire... et pour écrire ?

parser = argparse.ArgumentParser();

subparsers = parser.add_subparsers(dest='command')

ajouter = subparsers.add_parser("ajouter")
lister = subparsers.add_parser("lister")
total = subparsers.add_parser("total")

ajouter.add_argument("montant", type=float)
ajouter.add_argument("categorie" , type=str)
ajouter.add_argument("description", type=str)

args = parser.parse_args()

if args.command == "ajouter":
      depenses = charger()
      depense = {
          "montant": args.montant,
          "categorie": args.categorie,
          "description": args.description
      }
      depenses.append(depense)
      sauvegarder(depenses)

