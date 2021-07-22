import { FormControl,Validators } from "@angular/forms";

export const trimValidator : Validators = (control: FormControl) => {
    
    try {
        if (control.value.startsWith(' ') || control.value=='') {
            return {
              'trimError': { value: 'No puede estar vacio' }
            };
          }
          return null;
    } catch (error) {
        return null;
    }

  };



  export const negativos: Validators = (control: FormControl) => {
      try {
        if (parseFloat(control.value)<0) {
            return {
              'negativoError': { value: 'No pueden ingresar números negativos' }
            };
          }
          return null;
       
      } catch (error) {
          console.log(error);
        return null;
      }   

  };


  export const edadMinima: Validators = (control: FormControl) => {
    try {
      if (parseFloat(control.value)<18  || control.value=='') {
          return {
            'negativoError': { value: 'No pueden ingresar números negativos' }
          };
        }
        return null;
     
    } catch (error) {
        console.log(error);
      return null;
    }   

};


