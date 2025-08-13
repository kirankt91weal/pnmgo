// Utility functions for app settings

export const getTippingEnabled = () => {
  const savedTipping = localStorage.getItem('tippingEnabled');
  // Default to true if no setting is saved
  return savedTipping === null ? true : savedTipping === 'true';
};

export const setTippingEnabled = (enabled) => {
  localStorage.setItem('tippingEnabled', enabled.toString());
};

export const getOrderOptionEnabled = () => {
  const savedOrder = localStorage.getItem('orderOptionEnabled');
  // Default to true if no setting is saved
  return savedOrder === null ? true : savedOrder === 'true';
};

export const setOrderOptionEnabled = (enabled) => {
  localStorage.setItem('orderOptionEnabled', enabled.toString());
};

export const getCatalogOptionEnabled = () => {
  const savedCatalog = localStorage.getItem('catalogOptionEnabled');
  // Default to true if no setting is saved
  return savedCatalog === null ? true : savedCatalog === 'true';
};

export const setCatalogOptionEnabled = (enabled) => {
  localStorage.setItem('catalogOptionEnabled', enabled.toString());
};

export const getMemoEnabled = () => {
  const savedMemo = localStorage.getItem('memoEnabled');
  // Default to true if no setting is saved
  return savedMemo === null ? true : savedMemo === 'true';
};

export const setMemoEnabled = (enabled) => {
  localStorage.setItem('memoEnabled', enabled.toString());
};

export const getScanOptionEnabled = () => {
  const savedScan = localStorage.getItem('scanOptionEnabled');
  // Default to true if no setting is saved
  return savedScan === null ? true : savedScan === 'true';
};

export const setScanOptionEnabled = (enabled) => {
  localStorage.setItem('scanOptionEnabled', enabled.toString());
}; 