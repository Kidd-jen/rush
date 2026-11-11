import argparse
import json
from datetime import date, datetime
import sys

def charger():
    try:
        with open("depenses.json", "r") as f:   # "r" pour lire, "w" pour écrire : lequel ?
            return json.load(f)                          # la fonction du module json qui LIT un fichier
    except FileNotFoundError:
        return []
    except json.JSONDecodeError:
        print("Erreur : le fichier depenses.json est corrompu.")
        sys.exit()

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

total.add_argument("--categorie", type=str)
total.add_argument("--mois", type=str)

args = parser.parse_args()

if args.command == "ajouter":
      depenses = charger()
      depense = {
          "montant": args.montant,
          "categorie": args.categorie,
          "description": args.description,
          "date": date.today().isoformat()
      }
      depenses.append(depense)
      if args.montant < 0:
          print("Attention : le montant est négatif !")
      sauvegarder(depenses)

elif args.command == "lister":
        depenses = charger()
        if not depenses:
            print("Aucune dépense enregistrée.")
        for depense in depenses:
            print(f"{depense['date']} - {depense['categorie']} - {depense['description']} : {depense['montant']} €")

elif args.command == "total":
        depenses = charger()
        somme = 0
        for depense in depenses:
            if (args.categorie is None or depense['categorie'] == args.categorie) and (args.mois is None or depense['date'].startswith(args.mois)):
                somme += depense['montant']
        if args.categorie:
            print(f"Total des dépenses pour la catégorie '{args.categorie}' : {somme} €")
        else:
            print(f"Total des dépenses : {somme} €")