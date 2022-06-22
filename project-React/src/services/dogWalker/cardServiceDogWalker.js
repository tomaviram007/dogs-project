import httpService from "../httpService";
import config from "../../config.json";

export function createCard(card) {
  return httpService.post(`${config.apiUrl}/cardWalk`, card);
}

export function getCardsByUser(idUser) {
  return httpService.get(`${config.apiUrl}/cardWalk/byUser/${idUser}`);
}

export function getAllCards() {
  return httpService.get(`${config.apiUrl}/cardWalk`);
}

export async function getCard(id) {
  return httpService.get(`${config.apiUrl}/cardWalk/${id}`);
}

export async function getCardsByTag(tag) {
  return httpService.get(`${config.apiUrl}/cardWalk/serchByTag/${tag}`);
}

export async function getAllFavoriteWalker() {
  return httpService.get(`${config.apiUrl}/cardWalk/getAllFavoriteWalker`);
}

export async function checkFavoriteCard(id) {
  return httpService.get(`${config.apiUrl}/cardWalk/checkFvCard/${id}`);
}

export async function deleteFavoriteCard(favorite) {
  return httpService.patch(`${config.apiUrl}/cardWalk//deleteW`, favorite);
}

export async function addFavoriteCard(favorite) {
  return httpService.patch(`${config.apiUrl}/cardWalk/addW`, favorite);
}

export function editCard(id, card) {
  return httpService.put(`${config.apiUrl}/cardWalk/${id}`, card);
}

export function deleteCard(id) {
  return httpService.delete(`${config.apiUrl}/cardWalk/${id}`);
}

const cardService = {
  createCard,
  getCard,
  editCard,
  deleteCard,
  getCardsByUser,
  checkFavoriteCard,
  addFavoriteCard,
  deleteFavoriteCard,
  getAllCards,
  getAllFavoriteWalker,
  getCardsByTag,
};

export default cardService;
