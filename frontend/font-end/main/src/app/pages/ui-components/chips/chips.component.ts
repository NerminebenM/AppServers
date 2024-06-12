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

const TREE_DATA: MonitoringNode[] = [
  {
    name: 'Monitoring',
    children: [{name: 'Uptime'}, {name: 'Transactions'}],

  },
];

/**
 * @title Tree with nested nodes
 */
@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
})
export class AppChipsComponent {
  treeControl = new NestedTreeControl<MonitoringNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<MonitoringNode>();

  constructor(private router: Router) {
    this.dataSource.data = TREE_DATA;
  }



}
