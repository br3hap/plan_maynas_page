# Backend Plan Maynas — Django + DRF

## Stack
- Django 5.x + Django REST Framework
- djangorestframework-simplejwt (auth)
- django-cors-headers
- django-filter
- python-dotenv (secrets)
- SQLite (dev) → MariaDB (prod) vía `DATABASE_URL`
- PyMySQL o mysqlclient

## Estructura del repo `plan_maynas_backend/`
```
plan_maynas_backend/
├── manage.py
├── requirements.txt
├── .env.example
├── .gitignore               # ignora venv, .env, db.sqlite3, media/
├── config/
│   ├── settings/
│   │   ├── base.py
│   │   ├── dev.py           # SQLite
│   │   └── prod.py          # MariaDB via env
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── api/
│   ├── models.py            # Recurso, Publicacion, PdmAnexo, Categoria
│   ├── serializers.py
│   ├── views.py             # ViewSets
│   ├── urls.py              # /api/...
│   ├── permissions.py       # IsAdminOrReadOnly
│   └── management/commands/seed_docs.py   # parser HTML → DB
└── media/                   # git-ignored; en prod -> /home/munimaynas/media
```

## Modelos
```python
class Categoria(models.TextChoices):
    PDM = 'pdm', 'PDM Iquitos'
    PAT = 'pat', 'PAT Maynas'
    PMZM = 'pmzm', 'PMZM Iquitos'

class Recurso(models.Model):
    category = CharField(choices=Categoria.choices)
    title = CharField(max_length=300)
    description = TextField(blank=True)
    file_url = CharField(max_length=500)   # ruta relativa /media/pdf/x.pdf
    order = PositiveIntegerField(default=0)
    created_at, updated_at

class Publicacion(models.Model):
    CATEGORY_CHOICES = [('consulta',...),('audiencias',...),('participacion',...),
                        ('reconocimiento',...),('proyectos',...)]
    title = CharField(300)
    category = CharField(choices=...)
    date = DateField()
    image_url = CharField(500)             # /media/img/actualizaciones/x.jpg
    excerpt = CharField(blank=True)
    content = TextField()                  # HTML
    is_published = BooleanField(default=True)
    order = PositiveIntegerField(default=0)

class PdmAnexo(models.Model):
    section = CharField(100)               # 'Ordenanza','TOMO I', etc.
    label = CharField(200)
    image_url = CharField(500)             # /media/img/pdm/x.PNG
    file_url = CharField(500)
    order = PositiveIntegerField(default=0)
```

## endpoints REST
- `GET /api/recursos/?category=pdm`
- `GET /api/publicaciones/?category=consulta&q=texto`
- `GET /api/pdm-anexos/`
- `POST /api/auth/login/`, `POST /api/auth/refresh/`, `POST /api/auth/verify/`
- CRUD (admin): `POST/PUT/DELETE` en cada recurso con `IsAdminUser`

## Seed inicial (`seed_docs`)
Management command que:
1. Lee los HTML actuales de `src/pages/recursos.html`, `pdm-iquitos.html`, `publicaciones.html`.
2. Para cada `<a href="../docs/pdf/...">` → mapea a `Recurso` o `PdmAnexo` con `file_url = /media/pdf/<basename>`.
3. Para cada `<img src="../docs/img/actualizaciones/...">` en `publicaciones.html` + `<article data-...>` → `Publicacion` con `image_url`, `title`, `date` (parse del div `.noticia-fecha`), `content` (HTML del `<div class="full-content">`).
4. Inserta en DB (idempotente: usa `get_or_create` por title+category).

## Subida de archivos (manual, previa al seed)
- En el VPS: `mkdir -p /home/munimaynas/media/pdf /home/munimaynas/media/img/actualizaciones /home/munimaynas/media/img/pdm`
- Desde el local: `rsync -av --progress src/docs/pdf/ munimaynas@<vps>:/home/munimaynas/media/pdf/`
- `rsync -av --progress src/docs/img/actualizaciones/ munimaynas@<vps>:/home/munimaynas/media/img/actualizaciones/`
- `rsync -av --progress src/docs/img/pdm/ munimaynas@<vps>:/home/munimaynas/media/img/pdm/`
- El backend Django en prod: `MEDIA_ROOT=/home/munimaynas/media` y `MEDIA_URL=/media/`.

## Panel admin (futura fase frontend)
Upload widget sube archivo a `MEDIA_ROOT` y guarda `file_url='/media/pdf/<nombre>'`.

## Seguridad
- `DEBUG=False`, `ALLOWED_HOSTS`, `SECURE_SSL_REDIRECT=True`.
- Secrets en `.env` (SECRET_KEY, JWT keys, DB credentials).
- CORS restringido al dominio frontend.
- Rate-limit login con `django-axes`.
- Backups: `mysqldump` + `rsync media/` vía cron.

## Despliegue prod (VPS)
- gunicorn + systemd service
- nginx: `/api/ -> gunicorn`, `/media/ -> alias /home/munimaynas/media/`
- certbot HTTPS

## Fases backend
1. Scaffold repo + settings base/dev/prod + requirements.txt + .gitignore
2. Modelos + migraciones + seed_docs parser HTML
3. Serializers + viewsets + URLs + permisos
4. Auth JWT (login/refresh/verify)
5. Tests mínimos (pytest-django) por endpoint
6. Documentación de despliegue en el VPS

## Observaciones
- Los PDFs actuales (~540 MB, sólo 107 MB en git) **no entran al repo backend ni frontend**; se suben manualmente al VPS vía rsync. El backend sólo guarda la **ruta relativa** en DB.
- El frontend React+TS (a hacer después del backend) nunca carga binarios; consume `/media/...` y `/api/...` vía nginx.
- Cada upgrade: el usuario sube el archivo al VPS (rsync o panel admin) y lo referencia desde la DB.