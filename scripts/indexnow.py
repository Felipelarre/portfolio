"""Avisa Bing/Yandex/etc. (IndexNow) que o site mudou. Rodar DEPOIS de publicar.
Uso: python scripts/indexnow.py            (manda todas as URLs do sitemap.xml)
     python scripts/indexnow.py URL ...    (manda só as URLs dadas)
A chave é o nome do único arquivo <chave>.txt na raiz do site."""
import glob, json, os, re, sys, urllib.request

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HOST = "felipelarre.com.br"

def chave():
    achados = [os.path.basename(p)[:-4] for p in glob.glob(os.path.join(RAIZ, "*.txt"))
               if re.fullmatch(r"[0-9a-f]{32}\.txt", os.path.basename(p))]
    if len(achados) != 1:
        sys.exit(f"Esperava 1 arquivo <chave>.txt na raiz, achei {len(achados)}")
    return achados[0]

def urls_do_sitemap():
    xml = open(os.path.join(RAIZ, "sitemap.xml"), encoding="utf-8").read()
    return re.findall(r"<loc>([^<]+)</loc>", xml)

if __name__ == "__main__":
    k = chave()
    urls = sys.argv[1:] or urls_do_sitemap()
    corpo = json.dumps({"host": HOST, "key": k, "keyLocation": f"https://{HOST}/{k}.txt",
                        "urlList": urls}).encode()
    req = urllib.request.Request("https://api.indexnow.org/IndexNow", data=corpo,
                                 headers={"Content-Type": "application/json; charset=utf-8"})
    try:
        r = urllib.request.urlopen(req, timeout=20)
        print("IndexNow:", r.status, "-", len(urls), "URL(s)")
    except urllib.error.HTTPError as e:
        print("IndexNow erro:", e.code, e.read().decode()[:200]); sys.exit(1)
