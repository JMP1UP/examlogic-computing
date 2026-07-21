(function exposeSafeguarding(root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) root.BridgeSafeguarding = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function createSafeguardingApi() {
  function detectSafeguardingFlag(text) {
    if (!text || typeof text !== 'string') return { flagged: false, reason: '' };

    const baseText = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const spans = text.match(/(?:\+?\d[\s().-]*){7,}/g) || [];
    const phonePatterns = [
      /07\d{9}/,
      /0[67]\d{8}/,
      /01[567]\d{8,9}/,
      /[67]\d{8}/
    ];
    const hasPhoneNumber = spans.some(span => {
      const digits = span.replace(/[^0-9]/g, '');
      return phonePatterns.some(pattern => pattern.test(digits));
    });
    const hasEmailAddress = /\b[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+\b/i.test(text);

    const alphaNumericText = baseText.replace(/[^a-z0-9]/g, '');
    const concatPatterns = [
      'whatsapp', 'handynummer', 'adresse', 'skype', 'instagram', 'snapchat', 'tiktok', 'discord',
      'facebook', 'twitter', 'socialmedia', 'telegram', 'phonenumber', 'mobilenumber',
      'numerodetelephone', 'telefonnummer', 'numerodetelefono', 'homeaddress', 'adressepostale',
      'postaladdress', 'adressepersonnelle', 'direccionparticular', 'meetinsecret', 'secretmeeting',
      'meetalone', 'meetinprivate', 'meetupinsecret', 'heimlichtreffen', 'alleinetreffen', 'privattreffen',
      'rencontrerensecret', 'rencontresecrete', 'rencontrerseul', 'reunirseensecreto', 'reunionsecreta',
      'reunirseasolas'
    ];
    const matchedConcat = concatPatterns.filter(pattern => alphaNumericText.includes(pattern));

    const exactPhrases = [
      /\b(whatsapp|handynummer|address|adresse|skype|instagram|snapchat|tiktok|discord|facebook|twitter|social\s*media|telegram)\b/,
      /\b(phone\s*number|mobile\s*number|numero\s*de\s*telephone|telefonnummer|numero\s*de\s*telefono)\b/,
      /\b(home\s*address|adresse\s*postale|postal\s*address|adresse\s*personnelle|direccion\s*particular)\b/,
      /\b(meet\s*in\s*secret|secret\s*meeting|meet\s*alone|meet\s*in\s*private|meet\s*up\s*in\s*secret)\b/,
      /\b(heimlich\s*treffen|alleine\s*treffen|privat\s*treffen)\b/,
      /\b(rencontrer\s*en\s*secret|rencontre\s*secrete|rencontrer\s*seul)\b/,
      /\b(reunirse\s*en\s*secreto|reunion\s*secreta|reunirse\s*a\s*solas)\b/
    ];
    const matchedPhrases = [];
    for (const regex of exactPhrases) {
      const match = baseText.match(regex);
      if (match) matchedPhrases.push(match[0]);
    }

    if (!hasPhoneNumber && !hasEmailAddress && matchedConcat.length === 0 && matchedPhrases.length === 0) {
      return { flagged: false, reason: '' };
    }

    const reasonParts = [];
    if (hasPhoneNumber) reasonParts.push('phone number pattern');
    if (hasEmailAddress) reasonParts.push('email address pattern');
    if (matchedConcat.length) reasonParts.push(`concatenated terms: [${matchedConcat.join(', ')}]`);
    if (matchedPhrases.length) reasonParts.push(`sensitive phrases: [${matchedPhrases.join(', ')}]`);
    return { flagged: true, reason: `Safeguarding flag: ${reasonParts.join(' & ')}` };
  }

  return { detectSafeguardingFlag };
});
