import {NestedTreeControl} from '@angular/cdk/tree';
import {Component} from '@angular/core';
import {MatTreeNestedDataSource, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface MonitoringNode {
  name: string;
  children?: MonitoringNode[];
}



/**
 * @title Tree with nested nodes
 */
@Component({
  selector: 'app-child1',
  templateUrl: './child1.component.html',

})
export class AppChild1Component {
  treeControl = new NestedTreeControl<MonitoringNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<MonitoringNode>();

  constructor(private router: Router) {
    
  }



}
