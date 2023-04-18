import axios from 'axios';

const PERSONA_API_BASE_URL = "http://localhost:8090/api/v1/personas";
const config = {
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('token') 
  }
};

class PersonaService {
  async getPersonas() {
    try {
      return await axios.get(PERSONA_API_BASE_URL, config);
    } catch (error) {
      console.log(error);
    }
  }

  async createPersona(persona) {
    try {
      return await axios.post(PERSONA_API_BASE_URL, persona, config);
    } catch (error) {
      console.log(error);
    }
  }

  async getPersonaById(personaId) {
    try {
      return await axios.get(PERSONA_API_BASE_URL + '/' + personaId, config);
    } catch (error) {
      console.log(error);
    }
  }

  async updatePersona(personaId, persona) {
    try {
      return await axios.put(PERSONA_API_BASE_URL + '/' + personaId, persona, config);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteEmployee(personaId) {
    try {
      return await axios.delete(PERSONA_API_BASE_URL + '/' + personaId, config);
    } catch (error) {
      console.log(error);
    }
  }

}

export default new PersonaService();