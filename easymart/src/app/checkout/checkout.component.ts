import { Component, OnInit } from '@angular/core';
import {
  IPayPalConfig,
  ICreateOrderRequest
} from 'ngx-paypal';
import { AppService } from '../service/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
constructor( private router:Router, private api :AppService){}

  address: any = []
  proceedToPayStatus: Boolean = false;
  makePaymentStatus: Boolean = false;
  grandTotal: any = 0;
  public payPalConfig?: IPayPalConfig;
  ngOnInit(): void {
    this.initConfig();

  }
  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'EUR',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
              }
            }
          },
          items: [{
            name: 'Enterprise Subscription',
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'EUR',
              value: '9.99',
            },
          }]
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        alert("Payment Success");
        this.proceedToPayStatus = false;
        this.makePaymentStatus = false;
        this.router.navigateByUrl("/")
        this.api.emptycart();
        this.api.getCartCount();
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        alert("payment Failed")
        this.proceedToPayStatus = true;
      },
      onError: err => {
        console.log('OnError', err);
        alert("Transaction Failed, Please Try Again After some time")
        this.proceedToPayStatus = true;
      },
      // onClick: (data, actions) => {
      //   console.log('onClick', data, actions);
      // }
    };
  }

  proceedToBuy() {
    this.grandTotal = sessionStorage.getItem("total")
    const { username, apartment, place, pincode } = this.address;

    if (!username || !apartment || !place || !pincode) {
      alert("Please fill the form completely");
    }
    else {
      alert("Proceed")
      this.proceedToPayStatus = true;
    }
  }

  back() {
    this.proceedToPayStatus = false;
    this.address = []
  }

  makePayment() {
    this.makePaymentStatus=true;
  }

}
