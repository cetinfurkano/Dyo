const getDateFormat = (p, type) => {
    let date = new Date(p);
    let year = new Intl.DateTimeFormat("en", {year: "numeric"}).format(date);
    let month = new Intl.DateTimeFormat("en", {month: "2-digit"}).format(date);
    let day = new Intl.DateTimeFormat("en", {day: "2-digit"}).format(date);
    if (type === 0) {
      return year + "-" + month + "-" + day;
    }
    else if(type === 1){
      return day + "." + month + "." + year;
    }
  }

  export default getDateFormat;