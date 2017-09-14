import atob from 'atob';
import _ from 'lodash';

// Capitalizes first letter and also lowercases the others
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

// Compares strings taking into account numbers inside
export function naturalCompare(a, b) {
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' });
}
