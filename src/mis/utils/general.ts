import { SortItem } from '../models/filter.model';

export const isEmpty = (value: any): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== "number" && value === "") {
    return true;
  } else if (value === "undefined" || value === undefined) {
    return true;
  } else if (
    value !== null &&
    typeof value === "object" &&
    !Object.keys(value).length
  ) {
    return true;
  } else {
    return false;
  }
};

export const generateRandomName = (length = 6) => {
  const consonants = 'bcdfghjklmnpqrstvwxyz';
  const vowels = 'aeiou';
  let name = '';

  for (let i = 0; i < length; i++) {
    const isVowel = i % 2 === 0; // Alternating between vowels and consonants
    const characterSet = isVowel ? vowels : consonants;
    const randomIndex = Math.floor(Math.random() * characterSet.length);
    name += characterSet[randomIndex];
  }

  return name;
}

export const sortObjectToString = (sortItems: SortItem[]) => {
  let sortQuery = "";
  if (sortItems?.length > 0) {
    let sortStringArray = [];
    for (let i = 0; i < sortItems?.length; i++) {
      let sortItem = sortItems[i];
      sortStringArray.push(sortItem?.[0] + ":" + sortItem?.[1]);
    }

    if (sortStringArray?.length > 0) {
      sortQuery = sortStringArray.join(",");
    }
  }
  return sortQuery;
};

export const filterArrayByProperty = (searchText: string, property: string, array: any[]): any[] => {
  if (!searchText) return array;
  searchText = searchText.toLowerCase();

  return array.filter(item => {
    const value = item[property] ? item[property].toString().toLowerCase() : '';
    return value.includes(searchText);
  });
}



export const jsonToQueryString = (json: any) => {
  let queryString = "";
  if (json.hasOwnProperty("sort")) {
    json.sort = sortObjectToString(json?.sort);
  }
  let keys = Object.keys(json);
  if (keys.length > 0) {
    let queryArray = [];
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      if (json[key] !== undefined) {
        if (Array.isArray(json[key])) {
          let dd = '[' + json[key].toString() + ']';
          // for (let item of json[key]) {
          // if (item !== null) {
          // queryArray.push(
          //   encodeURIComponent(key) + "=" + encodeURIComponent(item)
          // );
          // }
          // }
          queryArray.push(
            encodeURIComponent(key) + "=" + encodeURIComponent(dd)
          );
        } else {
          queryArray.push(
            encodeURIComponent(key) + "=" + encodeURIComponent(json[key])
          );
        }
      }
    }
    if (queryArray.length > 0) {
      queryString = "?" + queryArray.join("&");
    }
  }
  return queryString;
};


export const jsonToQueryStringDep = (json: any) => {
  if (json.hasOwnProperty("sort")) {
    json.sort = sortObjectToString(json?.sort);
  }
  return (
    "?" +
    Object.keys(json)
      .map(function (key) {
        if (isEmpty(json[key])) {
          return;
        }
        return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
      })
      .join("&")
  );
};

export const removeArrayItem = (array: any[], index: number) => {
  if (index > -1) {
    array.splice(index, 1);
  }
  return array;
};

export const compareObjects = (obj1: any, obj2: any): boolean => {
  for (const key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      if (!(key in obj2) || obj1[key] !== obj2[key]) {
        return false;
      }
    }
  }
  return true;
}

export const newObject = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
}

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
