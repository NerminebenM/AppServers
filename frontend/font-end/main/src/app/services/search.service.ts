import { Injectable, ApplicationRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private appRef: ApplicationRef) {}

  search(keyword: string): any[] {
    const results: any[] = [];

    this.appRef.components.forEach((component) => {
      const componentInstance = component.instance;

      // Vérifiez ici les propriétés pertinentes pour la recherche
      // Par exemple, si vous recherchez dans une propriété `title`
      if (componentInstance.hasOwnProperty('title')) {
        const title = componentInstance['title'];

        // Vérifiez si le titre contient le terme de recherche
        if (title.toLowerCase().includes(keyword.toLowerCase())) {
          results.push({ title: title, component: component });
        }
      }
      // Vous pouvez étendre cela pour rechercher d'autres éléments de l'interface utilisateur
    });

    return results;
  }
}
