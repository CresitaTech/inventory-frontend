import { Component, OnInit } from '@angular/core';
// import * as BoldBI from '@boldbi/embed-sdk';
// import BoldBI from '@boldbi/boldbi-embedded-sdk';
import { BoldBI } from '@boldbi/boldbi-embedded-sdk';
// const BoldBI = require('@boldbi/boldbi-embedded-sdk');
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
    // BoldBI.create({
    //         serverUrl: "https://cloud.boldbi.com/bi",
    //         dashboardId: "3b6048ee-17c9-4a14-b974-656b16bd1d58",
    //         embedContainerId: "dashboard-container",// This should be the container id where you want to embed the dashboard
    //         authorizationServer: {
    //             url: "https://stagingapiserver.opallius.com/auth/users/get_embed_token/"
    //         },
    //         environment: BoldBI.Environment.Cloud,
    //         height: "800px",
    //         width: "100%"
    //     });
  }

  logout(){
    this.authService.logout();
  }

}
