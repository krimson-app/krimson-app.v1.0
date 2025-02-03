// This is a simple list of prohibited words. In a real-world scenario, 
// you would want a more comprehensive list and possibly use a third-party API for content moderation.
const prohibitedWords = [
    'profanity1', 'profanity2', 'threat1', 'threat2', 'solicitation1', 'solicitation2'
  ];
  
  export function moderateContent(content: string): { isAppropriate: boolean; reason?: string } {
    const lowerContent = content.toLowerCase();
  
    // Check for profanity
    const foundProfanity = prohibitedWords.find(word => lowerContent.includes(word));
    if (foundProfanity) {
      return { isAppropriate: false, reason: 'Profanity detected' };
    }
  
    // Check for potential threats (this is a very basic check and should be more sophisticated in a real application)
    if (lowerContent.includes('kill') || lowerContent.includes('hurt') || lowerContent.includes('attack')) {
      return { isAppropriate: false, reason: 'Potential threat detected' };
    }
  
    // Check for potential solicitations (again, this is a basic check)
    if (lowerContent.includes('buy') || lowerContent.includes('sell') || lowerContent.includes('offer')) {
      return { isAppropriate: false, reason: 'Potential solicitation detected' };
    }
  
    return { isAppropriate: true };
  }
  
  