import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Router } from '@angular/router';

interface MonitoringNode {
  name: string;
  children?: MonitoringNode[];
}

const TREE_DATA: MonitoringNode[] = [
  {
    name: 'Monitoring',

  },
];

@Component({
  selector: 'app-father',
  templateUrl: './father.component.html',
})
export class AppfatherComponent {
  treeControl = new NestedTreeControl<MonitoringNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<MonitoringNode>();

  constructor(private router: Router) {
    this.dataSource.data = TREE_DATA;
  }

 // hasChild = (_: number, node: MonitoringNode) => !!node.children && node.children.length > 0;
}
