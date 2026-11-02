"""Add the phone layer (mobile/) to every page in slides/. Idempotent: re-running replaces the old injection.
build.py calls this after regenerating slides/, so the local gallery sources stay desktop-only.
Run: python3 mobile.py"""
import os, re
HERE = os.path.dirname(os.path.abspath(__file__))
VP = '<meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover"><!--/MVP-->'
def inject(path):
    name = os.path.basename(path)[:-5]; s = open(path).read()
    s = re.sub(r'<meta name=viewport[^>]*><!--/MVP-->', '', s); s = re.sub(r'<!--MOBILE-->.*?<!--/MOBILE-->', '', s, flags=re.S)
    s = s.replace('<meta charset=utf-8>', '<meta charset=utf-8>' + VP, 1) if '<meta charset=utf-8>' in s else VP + s
    tags = ['<link rel=stylesheet href="../mobile/phone.css">', '<script src="../mobile/phone.js"></script>']
    for ext, t in (('css', '<link rel=stylesheet href="../mobile/%s.css">'), ('js', '<script src="../mobile/%s.js"></script>')):
        if os.path.exists(os.path.join(HERE, 'mobile', f'{name}.{ext}')): tags.append(t % name)
    s = s.rstrip() + '\n<!--MOBILE-->' + ''.join(tags) + '<!--/MOBILE-->\n'
    open(path, 'w').write(s)
if __name__ == '__main__':
    d = os.path.join(HERE, 'slides')
    for f in sorted(os.listdir(d)):
        if f.endswith('.html'): inject(os.path.join(d, f)); print('phone layer ->', f)
