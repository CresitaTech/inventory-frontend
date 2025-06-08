import { Component, ChangeDetectorRef } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-supply-chain-leadership',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './supply-chain-leadership.component.html',
  styleUrls: ['./supply-chain-leadership.component.css']
})
export class SupplyChainLeadershipComponent {

  modalData: any[] = [];
  modalHeaders: string[] = [];
  selectedChartLabel: string = '';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  inventoryChartOptions: ChartConfiguration<'bar'> = {
    type: 'bar',
    data: {
      labels: ['NC01', 'SF01-112', 'SF01-138', 'NC01-GMP-HZ', 'NC01-HZ', 'SF01-231-FUME', 'NC01-LAB118', 'SF01-235', 'NC02', 'SF01-244'],
      datasets: [
        {
          label: 'Value (in K USD)',
          data: [967, 870, 706, 667, 620, 458, 406, 370, 327, 270],
          backgroundColor: '#00C8C8'
        }
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Inventory Value (Top 10 Items by Value)',
          font: { size: 16 }
        }
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: 12
            }
          }
        },
        y: {
          ticks: {
            font: {
              size: 12
            }
          }
        }
      },
      layout: {
        padding: 20
      }
    }
  };

  obsolescenceChartOptions: ChartConfiguration<'bar'> = {
    type: 'bar',
    data: {
      labels: ['SSF', 'NC'],
      datasets: [
        {
          label: 'Obsolescence Value',
          data: [30000, 50000],
          backgroundColor: ['#2B50EC', '#9F40FF']
        }
      ]
    },
    options: {
      responsive: true,
      onClick: (event, elements, chart) => {
        if (elements.length > 0) {
          const index = elements[0].index;
          const label = this.obsolescenceChartOptions.data?.labels?.[index];
          if (typeof label === 'string') {
            this.onChartBarClick(label);
          }
        }
      }
    }
  };

  regionAccuracyChartOptions: ChartConfiguration<'bar'> = {
    type: 'bar',
    data: {
      labels: ['SSF', 'NC'],
      datasets: [
        {
          label: 'Accuracy (%)',
          data: [85, 60],
          backgroundColor: ['#2B50EC', '#9F40FF']
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Region wise Accuracy',
          font: { size: 16 }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: 'Accuracy (%)'
          }
        }
      }
    }
  };

  warehouseCycleCountChartOptions: ChartConfiguration<'bar'> = {
    type: 'bar',
    data: {
      labels: ['SF01-112', 'NC01-CR', 'SF01-138', 'SF01-231', 'NC01-LAB118'],
      datasets: [
        {
          label: 'Accuracy (%)',
          data: [90, 80, 60, 40, 20],
          backgroundColor: ['#00C8C8', '#FF6384']
        }
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Warehouse Cycle Count Accuracy',
          font: { size: 16 }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: 'Accuracy (%)'
          }
        }
      }
    }
  };

  cycleCountGaugeOptions: ChartConfiguration<'doughnut'> = {
    type: 'doughnut',
    data: {
      labels: ['Accuracy', 'Remaining'],
      datasets: [
        {
          data: [85, 15], // 85% accuracy
          backgroundColor: ['#4CAF50', '#e0e0e0'],
          borderWidth: 0
        }
      ]
    },
    options: {
      responsive: true,
      rotation: -90,
      circumference: 180,
      cutout: '70%',
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      }
    }
  };

  onChartBarClick(label: string) {
    const endpointMap: Record<string, string> = {
      SSF: 'https://stagingapiserver.opallius.com/auth/users/fetch_sf_report/',
      NC: 'https://stagingapiserver.opallius.com/auth/users/fetch_nc_report/'
    };

    const url = endpointMap[label];
    this.selectedChartLabel = label;
    console.log(`Attempting to fetch data for label: ${label} from URL: ${url}`); // New log

    if (!url) {
      console.error('No endpoint found for label:', label);
      return;
    }

    this.http.post<any>(url, {}).subscribe({
      next: (response) => {
        const data = response?.data ?? [];

        this.modalData = data;
        this.modalHeaders = data.length ? Object.keys(data[0]) : [];

        console.log('modalData length before opening modal:', this.modalData.length);
        this.cdr.detectChanges();

        this.openModal();
      },
      error: (err) => {
        console.error('API error:', err);
        this.modalData = [];
        this.modalHeaders = [];
        console.log('modalData cleared due to error. Length:', this.modalData.length);
        this.openModal();
      }
    });
  }

  openModal() {
    const modalElement = document.getElementById('obsolescenceModal');
    if (modalElement) {
      const bootstrapModal = new Modal(modalElement);
      bootstrapModal.show();
    }
  }

}
