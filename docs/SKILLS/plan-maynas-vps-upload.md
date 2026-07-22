---
name: plan-maynas-vps-upload
description: Ayuda para subir archivos al VPS de Plan Maynas. Comandos útiles para scp, permisos y conexión SSH.
---

## When to Use This Skill

Activar esta skill cuando el usuario necesite:
- Subir imágenes al VPS
- Actualizar archivos HTML en el VPS
- Problemas de permisos SSH/scp
- Comandos de conexión al servidor

## Datos del VPS

| Campo | Valor |
|-------|-------|
| IP pública | `100.58.2.135` |
| Usuario sudo | `ubuntu` |
| Usuario archivos | `munimaynas` |
| Ruta base | `/home/munimaynas/planmaynas2.munimaynas.gob.pe/` |
| Llave SSH | `/home/mauri12/.ssh/Credenciales-Aplicaciones-Nueva.pem` |

## Conexión SSH

```bash
ssh -i /home/mauri12/.ssh/Credenciales-Aplicaciones-Nueva.pem ubuntu@100.58.2.135
```

## Subir archivos con scp

### Subir imagen al VPS
```bash
scp -i /home/mauri12/.ssh/Credenciales-Aplicaciones-Nueva.pem /home/mauri12/projects/plan_maynas_page/src/docs/img/actualizaciones/img_NN.jpg munimaynas@100.58.2.135:/home/munimaynas/planmaynas2.munimaynas.gob.pe/src/docs/img/actualizaciones/
```

### Subir archivo HTML
```bash
scp -i /home/mauri12/.ssh/Credenciales-Aplicaciones-Nueva.pem /home/mauri12/projects/plan_maynas_page/src/pages/publicaciones.html munimaynas@100.58.2.135:/home/munimaynas/planmaynas2.munimaynas.gob.pe/src/pages/
```

## Problemas de permisos

### Si "Permission denied" al subir
Desde el VPS, cambiar propietario de la carpeta:
```bash
sudo chown ubuntu:ubuntu /home/munimaynas/planmaynas2.munimaynas.gob.pe/src/docs/img/actualizaciones/
sudo chown ubuntu:ubuntu /home/munimaynas/planmaynas2.munimaynas.gob.pe/src/pages/
```

### Dar permisos de escritura
```bash
sudo chmod 755 /home/munimaynas/planmaynas2.munimaynas.gob.pe/src/docs/img/actualizaciones/
```

## Rutas de archivos en VPS

| Archivo | Ruta en VPS |
|---------|-------------|
| Imágenes actualizaciones | `/home/munimaynas/planmaynas2.munimaynas.gob.pe/src/docs/img/actualizaciones/` |
| Publicaciones HTML | `/home/munimaynas/planmaynas2.munimaynas.gob.pe/src/pages/publicaciones.html` |

## Editar archivo en VPS con nano

```bash
sudo nano /home/munimaynas/planmaynas2.munimaynas.gob.pe/src/pages/publicaciones.html
```

## Workflow para nueva publicación

1. **Agregar publicación** en `src/pages/publicaciones.html` local (ya hecho)
2. **Subir imagen** con scp a la carpeta de actualizaciones
3. **Subir publicaciones.html** al VPS
4. Si hay error de permisos, ejecutar `chown` en el VPS y reintentar

## Notas

- El usuario `munimaynas` es el propietario de los archivos web
- El usuario `ubuntu` tiene permisos sudo
- Siempre usar la llave `.pem` con `-i` en scp
