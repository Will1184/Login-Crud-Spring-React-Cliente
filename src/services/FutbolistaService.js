import axios from 'axios';
import HeaderConfig from '../config/HeaderConfig';

const FUTBOLISTA_API_BASE_URL = "/api/v1/futbolistas";

class FutbolistasService {

  async findAllFutbolistas() {
    try {      
      return await axios.get(FUTBOLISTA_API_BASE_URL, HeaderConfig.config);
      
    } catch (error) {
      console.log(error);
    }
  }

  async createFutbolista(futbolista) {
    try {
      return await axios.post(FUTBOLISTA_API_BASE_URL, futbolista,  HeaderConfig.config);
    } catch (error) {
      console.log(error);
    }
  }

  async findFutbolistaById(futbolistaId) {
    try {
      return await axios.get(FUTBOLISTA_API_BASE_URL + '/' + futbolistaId,  HeaderConfig.config);
    } catch (error) {
      console.log(error);
    }
  }

  async updateFutbolista(futbolistaId, futbolista) {
    try {
      return await axios.put(FUTBOLISTA_API_BASE_URL + '/' + futbolistaId, futbolista,  HeaderConfig.config);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteFutbolista(futbolistaId) {
    try {
      return await axios.delete(FUTBOLISTA_API_BASE_URL + '/' + futbolistaId,  HeaderConfig.config);
    } catch (error) {
      console.log(error);
    }
  }

}
export default new FutbolistasService();