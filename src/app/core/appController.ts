import { Injectable, TemplateRef, Renderer2, RendererFactory2 } from '@angular/core';
import { debounceTime, tap, map } from "rxjs/operators";
import { AbstractControl } from '@angular/forms';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

@Injectable()
export class AppController {
    private renderer: Renderer2;

    constructor(public dialog: MatDialog, private rendererFactory: RendererFactory2,) {
        this.renderer = this.rendererFactory.createRenderer(null, null);
    }
    /** 
    * Autocomplete voltado para campos de objetos que repesentam entities passando id
    * @formControlEntity Field que contem instancia do objeto selected
    * @formControlIdEntity Field que contem ID da instancia do objeto selected
    * @handler Função anônima que tem responsabilidade em obter os registros de um `Autocomplete`
    * @minLength Quantidade mínima de chars digitado para efetuar a request
   */
    public handleAutoCompleteEntity(formControlEntity: AbstractControl, formControlIdEntity: AbstractControl, handler: any, minLength: number = 4) {
        //Inicia o id com o id da entidade recebida.
        if (formControlEntity.value) {
            formControlIdEntity.setValue(formControlEntity.value.id);
        } else {
            formControlIdEntity.reset();
        }
        formControlEntity
            .valueChanges
            .pipe(
                tap(async pValue => {
                    if (pValue && pValue.length >= minLength && pValue != null && pValue.toString() != '') {

                        try {
                            handler(pValue);
                        } catch (err) {
                            this.tratarErro(err);
                        }
                    }
                })
            ).subscribe(entidade => {
                //Na mudança do autocomplete, atualiza o id associado
                if (entidade != null && entidade.id) {
                    formControlIdEntity.setValue(entidade.id);
                } else {
                    formControlIdEntity.reset();
                }
            })
    }

    tratarErro(err: any) {

    }

    openDialog(paylaod: any, component: ComponentType<any> | TemplateRef<any>): MatDialogRef<any> {
        let dialogRef = null;

        dialogRef = this.dialog.open(component, {
            data: paylaod,
            hasBackdrop: true,
            disableClose: true,
        });

        return dialogRef;
    }

     /**
     * Método que estiliza o elemento de acordo com a propriedade passada.
     * @param elementRef Elemento a ser estilizado, nativeElement.
     * @param key Propriedade css a ser aplicada.
     * @param value Valor css a ser aplicado.
     * @returns void
     */
    setElementStyle(element: Element | null, key: string, value: string): void {
        this.renderer.setStyle(element, key, value);
    }
}