"""Checagem do SEO básico do site no ar (roda antes de entregar/publicar). Sai com erro se algo falhar."""
import glob, os, re, sys, urllib.request

H = "https://felipelarre.com.br"
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
erros = []

def get(u):
    try:
        r = urllib.request.urlopen(urllib.request.Request(u, headers={"User-Agent": "checagem-seo"}), timeout=20)
        return r.status, r.read().decode("utf-8", "ignore")
    except Exception as e:
        return getattr(e, "code", 0), ""

chaves = [os.path.basename(p)[:-4] for p in glob.glob(os.path.join(RAIZ, "*.txt"))
          if re.fullmatch(r"[0-9a-f]{32}\.txt", os.path.basename(p))]
if len(chaves) != 1:
    erros.append("IndexNow: precisa de exatamente 1 arquivo <chave>.txt na raiz")
else:
    s, corpo = get(f"{H}/{chaves[0]}.txt")
    if s != 200 or corpo.strip() != chaves[0]:
        erros.append(f"IndexNow: chave não está no ar ({s})")

s, robots = get(f"{H}/robots.txt")
if s != 200 or "Sitemap: " + H + "/sitemap.xml" not in robots:
    erros.append("robots.txt sem a linha Sitemap correta")

s, sm = get(f"{H}/sitemap.xml")
urls = re.findall(r"<loc>([^<]+)</loc>", sm)
if s != 200 or not urls:
    erros.append("sitemap.xml fora do ar ou vazio")
for u in urls:
    if get(u)[0] != 200:
        erros.append(f"sitemap lista URL que não abre: {u}")

s, home = get(H + "/")
for tag in ("og:title", "og:description", "og:image", "twitter:card", 'rel="canonical"'):
    if tag not in home:
        erros.append(f"home sem {tag}")
m = re.search(r'og:image" content="([^"]+)', home)
if m and get(m.group(1))[0] != 200:
    erros.append("og:image não abre")

if get(f"{H}/google2989ebc912bf8bdf.html")[0] != 200:
    erros.append("arquivo de verificação do Search Console sumiu")

print("\n".join("FALHA: " + e for e in erros) or "SEO básico OK")
sys.exit(1 if erros else 0)
