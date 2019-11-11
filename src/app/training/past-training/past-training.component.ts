import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core'; // ViewChild : give you a way to find template 
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})

export class PastTrainingComponent implements OnInit, AfterViewInit {

  displayedColumns = ['date', 'name', 'duration', 'calories', 'state']; //data format display
  dataSource = new MatTableDataSource<Exercise>(); //angular format of displaying data on the table, use exercise and not exercise[] array


  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
  	this.dataSource.data = this.trainingService.getCompletedOrCancelledExercises();
    this.dataSource.paginator = this.paginator;
  }

  // Initialize after the view has done rendering
  ngAfterViewInit(){
  	this.dataSource.sort = this.sort;
  }

   applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
