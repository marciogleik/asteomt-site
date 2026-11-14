#!/usr/bin/env bash
# Publica o site (asteomt-web/dist) na Hostinger via FTPS.
# Usuário e senha do FTP ficam no Keychain do macOS (serviço "asteomt-ftp"), nunca neste arquivo.
#
# Uso:
#   ./deploy.sh            build + envio
#   ./deploy.sh --dry-run  build + lista o que seria enviado, sem enviar nada
#
# Cadastrar/trocar a credencial (a senha é pedida no terminal):
#   security add-generic-password -U -s asteomt-ftp -a <usuario> -w
set -euo pipefail

FTP_HOST="82.25.67.160"
KEYCHAIN_SERVICE="asteomt-ftp"

cd "$(dirname "$0")"

DRY=""
if [[ "${1:-}" == "--dry-run" ]]; then DRY="--dry-run"; fi

FTP_USER=$(security find-generic-password -s "$KEYCHAIN_SERVICE" 2>/dev/null | sed -n 's/.*"acct"<blob>="\(.*\)"/\1/p' || true)
if [[ -z "$FTP_USER" ]]; then
  echo "Credencial \"$KEYCHAIN_SERVICE\" não encontrada no Keychain." >&2
  echo "Cadastre com: security add-generic-password -U -s $KEYCHAIN_SERVICE -a <usuario> -w" >&2
  exit 1
fi
LFTP_PASSWORD=$(security find-generic-password -s "$KEYCHAIN_SERVICE" -w)
export LFTP_PASSWORD

npm run build

# O certificado do servidor é *.hstgr.io e o acesso é pelo IP, então o nome não confere:
# a cadeia do certificado é verificada, o nome não. Com o hostname *.hstgr.io do hPanel,
# troque FTP_HOST por ele e ligue ssl:check-hostname.
# assets/ sobe antes do index.html, para o index novo nunca apontar para arquivos que ainda não estão lá.
# O lftp exige os comandos do -e numa linha só.
LFTP_CMDS="set net:max-retries 2; set net:timeout 30"
LFTP_CMDS+="; set ftp:ssl-force yes; set ftp:ssl-protect-data yes"
LFTP_CMDS+="; set ssl:verify-certificate yes; set ssl:check-hostname no"
LFTP_CMDS+="; mirror -R $DRY --parallel=4 dist/assets assets"
LFTP_CMDS+="; mirror -R $DRY --parallel=4 --exclude ^assets/ dist/ ./"
LFTP_CMDS+="; bye"
lftp --env-password -u "$FTP_USER" -e "$LFTP_CMDS" "ftp://$FTP_HOST"

if [[ -z "$DRY" ]]; then
  local_js=$(grep -oE 'assets/index-[A-Za-z0-9_-]+\.js' dist/index.html | head -1 || true)
  live_js=$(curl -fsS https://asteomt.com.br/ | grep -oE 'assets/index-[A-Za-z0-9_-]+\.js' | head -1 || true)
  if [[ -n "$local_js" && "$live_js" == "$local_js" ]]; then
    echo "No ar: $live_js"
  else
    echo "Atenção: o site serve \"$live_js\", o build local é \"$local_js\" (pode ser cache da Hostinger)." >&2
  fi
fi
