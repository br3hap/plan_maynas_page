---
name: plan-maynas-vps-upload
description: Subir archivos al VPS de Plan Maynas. Comandos listos para copiar y ejecutar.
---

## When to Use This Skill

Activar esta skill cuando el usuario necesite:
- Subir archivos (PDFs, imágenes, HTML) al VPS
- Corregir permisos en el VPS
- Conectar por SSH al servidor

## Datos del VPS

| Campo | Valor |
|-------|-------|
| IP pública | `100.58.2.135` |
| Usuario sudo | `ubuntu` |
| Usuario archivos | `munimaynas` |
| Ruta base | `/home/munimaynas/planmaynas2.munimaynas.gob.pe/` |
| Llave SSH | `/home/mauri12/.ssh/Credenciales-Aplicaciones-Nueva.pem` |

## Comandos rápidos

> **IMPORTANTE**: El VPS solo acepta login SSH con usuario `ubuntu`. El `scp` debe hacerse con `ubuntu`, y luego mover el archivo con `sudo`.

### Conexión SSH
```bash
ssh -i /home/mauri12/.ssh/Credenciales-Aplicaciones-Nueva.pem ubuntu@100.58.2.135
```

### Subir PDF a src/docs/pdf/
```bash
# Paso 1: subir a /tmp/
scp -i /home/mauri12/.ssh/Credenciales-Aplicaciones-Nueva.pem "/home/mauri12/projects/plan_maynas_page/src/docs/pdf/ARCHIVO.pdf" ubuntu@100.58.2.135:/tmp/

# Paso 2: mover a destino final + permisos (en una sola línea)
ssh -i /home/mauri12/.ssh/Credenciales-Aplicaciones-Nueva.pem ubuntu@100.58.2.135 "sudo cp '/tmp/ARCHIVO.pdf' /home/munimaynas/planmaynas2.munimaynas.gob.pe/src/docs/pdf/ && sudo chown munimaynas:munimaynas '/home/munimaynas/planmaynas2.munimaynas.gob.pe/src/docs/pdf/ARCHIVO.pdf' && sudo chmod 644 '/home/munimaynas/planmaynas2.munimaynas.gob.pe/src/docs/pdf/ARCHIVO.pdf' && rm '/tmp/ARCHIVO.pdf'"
```

### Subir imagen a src/docs/img/
```bash
scp -i /home/mauri12/.ssh/Credenciales-Aplicaciones-Nueva.pem "/home/mauri12/projects/plan_maynas_page/src/docs/img/ARCHIVO.jpg" ubuntu@100.58.2.135:/tmp/

ssh -i /home/mauri12/.ssh/Credenciales-Aplicaciones-Nueva.pem ubuntu@100.58.2.135 "sudo cp '/tmp/ARCHIVO.jpg' /home/munimaynas/planmaynas2.munimaynas.gob.pe/src/docs/img/ && sudo chown munimaynas:munimaynas '/home/munimaynas/planmaynas2.munimaynas.gob.pe/src/docs/img/ARCHIVO.jpg' && sudo chmod 644 '/home/munimaynas/planmaynas2.munimaynas.gob.pe/src/docs/img/ARCHIVO.jpg' && rm '/tmp/ARCHIVO.jpg'"
```

### Subir página HTML
```bash
scp -i /home/mauri12/.ssh/Credenciales-Aplicaciones-Nueva.pem "/home/mauri12/projects/plan_maynas_page/src/pages/PAGINA.html" ubuntu@100.58.2.135:/tmp/

ssh -i /home/mauri12/.ssh/Credenciales-Aplicaciones-Nueva.pem ubuntu@100.58.2.135 "sudo cp '/tmp/PAGINA.html' /home/munimaynas/planmaynas2.munimaynas.gob.pe/src/pages/ && sudo chown munimaynas:munimaynas '/home/munimaynas/planmaynas2.munimaynas.gob.pe/src/pages/PAGINA.html' && sudo chmod 644 '/home/munimaynas/planmaynas2.munimaynas.gob.pe/src/pages/PAGINA.html' && rm '/tmp/PAGINA.html'"
```

### Subir recurso (CSS, script, etc.)
```bash
scp -i /home/mauri12/.ssh/Credenciales-Aplicaciones-Nueva.pem "/home/mauri12/projects/plan_maynas_page/src/DESTINO/ARCHIVO" ubuntu@100.58.2.135:/tmp/

ssh -i /home/mauri12/.ssh/Credenciales-Aplicaciones-Nueva.pem ubuntu@100.58.2.135 "sudo cp '/tmp/ARCHIVO' /home/munimaynas/planmaynas2.munimaynas.gob.pe/src/DESTINO/ && sudo chown munimaynas:munimaynas '/home/munimaynas/planmaynas2.munimaynas.gob.pe/src/DESTINO/ARCHIVO' && sudo chmod 644 '/home/munimaynas/planmaynas2.munimaynas.gob.pe/src/DESTINO/ARCHIVO' && rm '/tmp/ARCHIVO'"
```

## Fix permisos (ejecutar en VPS vía SSH)

Si da "Permission denied" al subir:

```bash
# PDFs
sudo chown -R munimaynas:munimaynas /home/munimaynas/planmaynas2.munimaynas.gob.pe/src/docs/pdf/ && sudo chmod 755 /home/munimaynas/planmaynas2.munimaynas.gob.pe/src/docs/pdf/

# Imágenes
sudo chown -R munimaynas:munimaynas /home/munimaynas/planmaynas2.munimaynas.gob.pe/src/docs/img/ && sudo chmod 755 /home/munimaynas/planmaynas2.munimaynas.gob.pe/src/docs/img/

# Páginas
sudo chown -R munimaynas:munimaynas /home/munimaynas/planmaynas2.munimaynas.gob.pe/src/pages/ && sudo chmod 755 /home/munimaynas/planmaynas2.munimaynas.gob.pe/src/pages/

# Estilos
sudo chown -R munimaynas:munimaynas /home/munimaynas/planmaynas2.munimaynas.gob.pe/src/style/ && sudo chmod 755 /home/munimaynas/planmaynas2.munimaynas.gob.pe/src/style/
```

## Rutas en VPS

| Tipo | Ruta destino |
|------|-------------|
| PDFs | `/home/munimaynas/planmaynas2.munimaynas.gob.pe/src/docs/pdf/` |
| Imágenes | `/home/munimaynas/planmaynas2.munimaynas.gob.pe/src/docs/img/` |
| Actualizaciones | `/home/munimaynas/planmaynas2.munimaynas.gob.pe/src/docs/img/actualizaciones/` |
| Páginas HTML | `/home/munimaynas/planmaynas2.munimaynas.gob.pe/src/pages/` |
| Estilos CSS | `/home/munimaynas/planmaynas2.munimaynas.gob.pe/src/style/` |

## Workflow subida completa (ejemplo: nuevo PDF)

```bash
# 1. Subir el PDF
scp -i /home/mauri12/.ssh/Credenciales-Aplicaciones-Nueva.pem "/home/mauri12/projects/plan_maynas_page/src/docs/pdf/NUEVO.pdf" munimaynas@100.58.2.135:/home/munimaynas/planmaynas2.munimaynas.gob.pe/src/docs/pdf/

# 2. Si falla permisos, fix en VPS
ssh -i /home/mauri12/.ssh/Credenciales-Aplicaciones-Nueva.pem ubuntu@100.58.2.135 "sudo chown -R munimaynas:munimaynas /home/munimaynas/planmaynas2.munimaynas.gob.pe/src/docs/pdf/ && sudo chmod 755 /home/munimaynas/planmaynas2.munimaynas.gob.pe/src/docs/pdf/"

# 3. Reintentar subida
scp -i /home/mauri12/.ssh/Credenciales-Aplicaciones-Nueva.pem "/home/mauri12/projects/plan_maynas_page/src/docs/pdf/NUEVO.pdf" munimaynas@100.58.2.135:/home/munimaynas/planmaynas2.munimaynas.gob.pe/src/docs/pdf/
```

## Notas

- El usuario `munimaynas` es el propietario de los archivos web
- El usuario `ubuntu` tiene permisos sudo
- Siempre usar la llave `.pem` con `-i` en scp
- Poner siempre las rutas entre comillas dobles `"` para manejar espacios en nombres
