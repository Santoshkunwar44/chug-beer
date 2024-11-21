import CryptoJS from "crypto-js";

const secretKey = "(dfghjlkljgfdghjk)gyftgjvm&bhvbghb,hkbjn-bn.n@bn0-"; // Keep this key safe and secure!

const addUserDataToLS = ({ userId }: { userId: string }) => {
  const payload = {
    userId: userId,
  };
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(payload),
    secretKey
  ).toString();
  localStorage.setItem("_AimAuAilAoei2", encryptedData);
};
const getUserDataFromLS = (): { userId: string } | null => {
  const encryptedData = localStorage.getItem("_AimAuAilAoei2");
  if (encryptedData) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return {
      userId: decryptedData.userId,
    };
  } else {
    return null;
  }
};

const removeUserDataFromLS = () => {
  localStorage.removeItem("_AimAuAilAoei2");
};

export const methods = {
  addUserDataToLS,
  getUserDataFromLS,
  removeUserDataFromLS,
};
