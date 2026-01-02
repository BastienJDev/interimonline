import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CandidatData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string | null;
  ville: string | null;
  adresse: string | null;
  poste: string;
  experience: string | null;
  disponibilite: string | null;
  status: string;
  created_at: string;
  validated_at: string | null;
}

interface Mission {
  titre: string;
  lieu: string;
  type_contrat: string;
  date_debut: string | null;
  date_fin: string | null;
  salaire_min: number | null;
  salaire_max: number | null;
  status: string;
}

interface RequestBody {
  candidat: CandidatData;
  missions: Mission[];
  exportType: 'full' | 'anonymous';
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('fr-FR');
}

function generateFullPDF(candidat: CandidatData, missions: Mission[]): string {
  const missionsHtml = missions.length > 0 
    ? missions.map(m => `
      <div class="mission">
        <div class="mission-title">${m.titre}</div>
        <div class="mission-details">
          <span>📍 ${m.lieu}</span>
          <span>📋 ${m.type_contrat.toUpperCase()}</span>
          ${m.date_debut ? `<span>📅 ${formatDate(m.date_debut)}${m.date_fin ? ` - ${formatDate(m.date_fin)}` : ''}</span>` : ''}
          ${m.salaire_min || m.salaire_max ? `<span>💰 ${m.salaire_min || ''}${m.salaire_min && m.salaire_max ? ' - ' : ''}${m.salaire_max || ''}€/h</span>` : ''}
        </div>
        <div class="mission-status ${m.status}">${m.status === 'pourvue' ? 'Pourvue' : m.status === 'terminee' ? 'Terminée' : m.status}</div>
      </div>
    `).join('')
    : '<p class="no-data">Aucune mission réalisée</p>';

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Fiche Candidat - ${candidat.prenom} ${candidat.nom}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; color: #333; background: #fff; }
    .header { display: flex; align-items: center; gap: 20px; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 3px solid #f97316; }
    .avatar { width: 80px; height: 80px; background: linear-gradient(135deg, #f97316, #ea580c); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 28px; font-weight: bold; }
    .header-info h1 { font-size: 24px; color: #1a1a1a; }
    .header-info p { color: #666; font-size: 14px; }
    .status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-top: 8px; }
    .status.valide { background: #dcfce7; color: #166534; }
    .status.en_attente { background: #fef3c7; color: #92400e; }
    .status.rejete { background: #fee2e2; color: #991b1b; }
    .section { margin-bottom: 25px; }
    .section-title { font-size: 16px; font-weight: 600; color: #f97316; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #e5e7eb; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .info-card { background: #f9fafb; padding: 16px; border-radius: 8px; }
    .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
    .info-row:last-child { border-bottom: none; }
    .info-label { color: #6b7280; font-size: 13px; }
    .info-value { font-weight: 500; font-size: 13px; }
    .mission { background: #f9fafb; padding: 16px; border-radius: 8px; margin-bottom: 12px; border-left: 4px solid #f97316; }
    .mission-title { font-weight: 600; font-size: 15px; margin-bottom: 8px; }
    .mission-details { display: flex; flex-wrap: wrap; gap: 16px; font-size: 13px; color: #6b7280; }
    .mission-status { display: inline-block; margin-top: 8px; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 600; }
    .mission-status.pourvue { background: #dcfce7; color: #166534; }
    .mission-status.terminee { background: #e5e7eb; color: #374151; }
    .no-data { color: #9ca3af; font-style: italic; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; font-size: 12px; color: #9ca3af; }
    .confidential { background: #fef3c7; color: #92400e; padding: 8px 16px; border-radius: 4px; font-weight: 600; text-align: center; margin-bottom: 20px; }
  </style>
</head>
<body>
  <div class="confidential">📋 DOCUMENT INTERNE - CONFIDENTIEL</div>
  
  <div class="header">
    <div class="avatar">${candidat.prenom[0]}${candidat.nom[0]}</div>
    <div class="header-info">
      <h1>${candidat.prenom} ${candidat.nom}</h1>
      <p>${candidat.poste}</p>
      <span class="status ${candidat.status}">${candidat.status === 'valide' ? '✓ Validé' : candidat.status === 'en_attente' ? '⏳ En attente' : '✗ Rejeté'}</span>
    </div>
  </div>

  <div class="grid">
    <div class="section">
      <div class="section-title">📧 Coordonnées</div>
      <div class="info-card">
        <div class="info-row">
          <span class="info-label">Email</span>
          <span class="info-value">${candidat.email}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Téléphone</span>
          <span class="info-value">${candidat.telephone || '-'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Ville</span>
          <span class="info-value">${candidat.ville || '-'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Adresse</span>
          <span class="info-value">${candidat.adresse || '-'}</span>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">💼 Informations professionnelles</div>
      <div class="info-card">
        <div class="info-row">
          <span class="info-label">Poste recherché</span>
          <span class="info-value">${candidat.poste}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Expérience</span>
          <span class="info-value">${candidat.experience || '-'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Disponibilité</span>
          <span class="info-value">${candidat.disponibilite || '-'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Date candidature</span>
          <span class="info-value">${formatDate(candidat.created_at)}</span>
        </div>
        ${candidat.validated_at ? `
        <div class="info-row">
          <span class="info-label">Date validation</span>
          <span class="info-value">${formatDate(candidat.validated_at)}</span>
        </div>
        ` : ''}
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">📅 Missions réalisées</div>
    ${missionsHtml}
  </div>

  <div class="footer">
    Document généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}
  </div>
</body>
</html>
  `;
}

function generateAnonymousPDF(candidat: CandidatData, missions: Mission[]): string {
  const anonymousName = `${candidat.prenom[0]}. ${candidat.nom[0]}.`;
  
  const missionsHtml = missions.length > 0 
    ? missions.map(m => `
      <div class="mission">
        <div class="mission-title">${m.titre}</div>
        <div class="mission-details">
          <span>📍 ${m.lieu}</span>
          <span>📋 ${m.type_contrat.toUpperCase()}</span>
          ${m.date_debut ? `<span>📅 ${formatDate(m.date_debut)}${m.date_fin ? ` - ${formatDate(m.date_fin)}` : ''}</span>` : ''}
        </div>
        <div class="mission-status ${m.status}">${m.status === 'pourvue' ? 'Pourvue' : m.status === 'terminee' ? 'Terminée' : m.status}</div>
      </div>
    `).join('')
    : '<p class="no-data">Aucune mission réalisée</p>';

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Profil Candidat - ${anonymousName}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; color: #333; background: #fff; }
    .header { display: flex; align-items: center; gap: 20px; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 3px solid #f97316; }
    .avatar { width: 80px; height: 80px; background: linear-gradient(135deg, #f97316, #ea580c); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 28px; font-weight: bold; }
    .header-info h1 { font-size: 24px; color: #1a1a1a; }
    .header-info p { color: #666; font-size: 14px; }
    .status { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-top: 8px; }
    .status.valide { background: #dcfce7; color: #166534; }
    .section { margin-bottom: 25px; }
    .section-title { font-size: 16px; font-weight: 600; color: #f97316; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #e5e7eb; }
    .info-card { background: #f9fafb; padding: 16px; border-radius: 8px; }
    .info-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
    .info-row:last-child { border-bottom: none; }
    .info-label { color: #6b7280; font-size: 13px; }
    .info-value { font-weight: 500; font-size: 13px; }
    .mission { background: #f9fafb; padding: 16px; border-radius: 8px; margin-bottom: 12px; border-left: 4px solid #f97316; }
    .mission-title { font-weight: 600; font-size: 15px; margin-bottom: 8px; }
    .mission-details { display: flex; flex-wrap: wrap; gap: 16px; font-size: 13px; color: #6b7280; }
    .mission-status { display: inline-block; margin-top: 8px; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 600; }
    .mission-status.pourvue { background: #dcfce7; color: #166534; }
    .mission-status.terminee { background: #e5e7eb; color: #374151; }
    .no-data { color: #9ca3af; font-style: italic; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; font-size: 12px; color: #9ca3af; }
    .client-notice { background: #eff6ff; color: #1e40af; padding: 8px 16px; border-radius: 4px; font-weight: 500; text-align: center; margin-bottom: 20px; font-size: 13px; }
  </style>
</head>
<body>
  <div class="client-notice">👤 PROFIL CANDIDAT - Pour plus d'informations, contactez votre agence</div>
  
  <div class="header">
    <div class="avatar">${candidat.prenom[0]}${candidat.nom[0]}</div>
    <div class="header-info">
      <h1>${anonymousName}</h1>
      <p>${candidat.poste}</p>
      <span class="status valide">✓ Candidat vérifié</span>
    </div>
  </div>

  <div class="section">
    <div class="section-title">💼 Informations professionnelles</div>
    <div class="info-card">
      <div class="info-row">
        <span class="info-label">Poste recherché</span>
        <span class="info-value">${candidat.poste}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Expérience</span>
        <span class="info-value">${candidat.experience || '-'}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Disponibilité</span>
        <span class="info-value">${candidat.disponibilite || '-'}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Zone géographique</span>
        <span class="info-value">${candidat.ville || '-'}</span>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">📅 Expériences de missions</div>
    ${missionsHtml}
  </div>

  <div class="footer">
    Profil généré le ${new Date().toLocaleDateString('fr-FR')} - Référence interne uniquement
  </div>
</body>
</html>
  `;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { candidat, missions, exportType } = await req.json() as RequestBody;

    console.log(`Generating ${exportType} PDF for candidat: ${candidat.prenom} ${candidat.nom}`);

    const html = exportType === 'full' 
      ? generateFullPDF(candidat, missions)
      : generateAnonymousPDF(candidat, missions);

    // Return HTML that will be converted to PDF on the client side
    return new Response(
      JSON.stringify({ html, filename: exportType === 'full' 
        ? `Fiche_${candidat.prenom}_${candidat.nom}.pdf`
        : `Profil_${candidat.prenom[0]}${candidat.nom[0]}.pdf`
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error generating PDF:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
