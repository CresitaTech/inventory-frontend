import { Component, OnInit } from '@angular/core';
// import * as BoldBI from '@boldbi/embed-sdk';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { SupplyChainLeadershipComponent } from '../dashboard-view/role-sections/supply-chain-leadership/supply-chain-leadership.component';

@Component({
  selector: 'app-dashboard-view',
  standalone: true,
  imports: [CommonModule, SupplyChainLeadershipComponent],
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css']
})
export class DashboardViewComponent implements OnInit {

  role: string = 'Supply Chain Leadership';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // const role = this.authService.getRole();
    // let dashboardId = role === 'admin' ? 'admin-dashboard-id' : 'user-dashboard-id';
    // this.role = this.authService.getRole();

    // BoldBI.embed({
    //   id: dashboardId,
    //   embedContainerId: 'dashboard-container',
    //   url: 'https://your-boldbi-server.com',
    //   embedContainerHeight: '800px',
    //   environment: 'enterprise',
    //   authorizationServer: {
    //     url: 'https://your-backend.com/get-embed-details?dashboardId=' + dashboardId
    //   },
    //   iframeSettings: { style: { border: 'none' } }
    // });
  }

  logout(){
    this.authService.logout();
  }

}
