import * as moment from 'moment';
import DateTimeService from '../services/DateTimeService';

export default class NewsFeedController {
    allTimezoneNames: string[];
    dateOfBirth: moment.Moment;
    offsetValue: Number;

    constructor(
        private $scope: any,
        private $document: ng.IDocumentService,
        private dateTimeService: DateTimeService,
        private $http: ng.IHttpService,
        private $ionicPopup: ionic.popup.IonicPopupService,
        private $cordovaNetwork: ngCordova.INetworkInformationService,
        private $rootScope: ng.IRootScopeService
    ) {
        let utcNow = dateTimeService.getUtcNow();
        $scope.message = `Hello my new world at ${utcNow.toISOString()}`;
        $document.find('#message').css('background-color', '#F00');
        this.allTimezoneNames = this.dateTimeService.getAllTimezoneNames();
        this.dateOfBirth = this.dateTimeService.getDateOfBirth();
        this.offsetValue = this.dateTimeService.getTimezoneOffset();

    }

    public async alert(): Promise<void> {
        const result = await this.$http.get('https://server.test-cors.org/server?id=3149187&enable=true&status=200&credentials=false');
        console.log(result.data);
        await this.showModal();
        console.log('done');
    }

    private async showModal(): Promise<void> {
        return this.$ionicPopup.alert({ title: 'ok', template: 'It is okay' });
    }

    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public async getNetworkStatus(): Promise<void> {
        await this.$ionicPopup.alert({
            title: 'Network status',
            template: `Current network status ${this.$cordovaNetwork.isOnline()}`
        });
        if (this.$cordovaNetwork.isOnline()) {
            this.$document.find('.offline-status').css('display', 'none');
        } else {
            this.$document.find('.offline-status').css('display', 'flex');
        }
    }
}
