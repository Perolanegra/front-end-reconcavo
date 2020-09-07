import { FormGroup, FormBuilder, FormControl, AbstractControl } from "@angular/forms";
import { Location } from "@angular/common"
import { AppController } from './appController';
import { Directive } from '@angular/core';
import { AppDefault } from './app-default';

@Directive()
export abstract class NgFormDefault extends AppDefault {
    //Forumlario que o usuário preencherá
    form: FormGroup;

    constructor(protected formBuilder: FormBuilder,
    protected appController: AppController,
    protected location: Location) {
        super();
        this.form = this.formBuilder.group({});
    }


    ngOnInit() {
    
    }

    public abstract setForm(): void;


    back() {
        this.location.back();
    }


    //Metodo que mostra o nome do objeto no autocomplete
    getByName(pItem: any) {
        return pItem ? pItem.name : undefined;
    }

    get formControls(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }


    submit() {
        try {

        } catch (err) {
            this.appController.tratarErro(err);
        }
    }

    getNameItem(item: any) {
        return item ? item.name : undefined;
    }

}