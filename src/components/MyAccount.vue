<template>
  <div class="columns" id="backdrop">
    <div class="column is-8 is-offset-2">
      <transition appear name="slide-fade">
        <div class="box">
          <center><p id="heading">My Account</p></center>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Username</label>
            </div>
            <div class="field-body">
              <div class="field is-expanded">
                <div class="control is-expanded">
                  <input :class="{'input is-medium': true, 'is-danger': isUsernameEmpty}" type="text"
                         v-model="username">
                </div>
                <p class="help is-danger" v-show="isUsernameEmpty">Please enter a username</p>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Email</label>
            </div>
            <div class="field-body">
              <div class="field is-expanded">
                <div class="control is-expanded">
                  <input :class="{'input is-medium': true, 'is-danger': isEmailEmpty}" type="email" v-model="email">
                </div>
                <p class="help is-danger" v-show="isEmailEmpty">Please enter a valid email</p>
              </div>
            </div>
          </div>
          <center>
            <a class="button" id="change-password" @click="showChangePassword = !showChangePassword">
              Change Password&nbsp;
              <i class="fa fa-chevron-up" aria-hidden="true" v-if="showChangePassword"></i>
              <i class="fa fa-chevron-down" aria-hidden="true" v-else></i>
            </a>
          </center>
          <transition name="slide-down">
            <div v-show="showChangePassword">
              <div class="field is-horizontal">
                <div class="field-label is-normal">
                  <label class="label">Old Password</label>
                </div>
                <div class="field-body">
                  <div class="field is-expanded">
                    <div class="control is-expanded">
                      <input :class="{'input is-medium': true, 'is-danger': isOldPasswordEmpty}" type="password"
                             v-model="oldPassword">
                    </div>
                    <p class="help is-danger" v-show="isOldPasswordEmpty">{{ errorMessage }}</p>
                  </div>
                </div>
              </div>
              <div class="field is-horizontal">
                <div class="field-label is-normal">
                  <label class="label">New Password</label>
                </div>
                <div class="field-body">
                  <div class="field is-expanded">
                    <div class="control is-expanded">
                      <input :class="{'input is-medium': true, 'is-danger': isNewPasswordEmpty}" type="password"
                             v-model="newPassword">
                    </div>
                    <p class="help is-danger" v-show="isNewPasswordEmpty">New Password cannot be blank</p>
                  </div>
                </div>
              </div>
            </div>
          </transition>
          <div class="columns" style="margin-top: 2%">
            <div class="column">
              <div class="field is-grouped is-grouped-left">
                <p class="control">
                  <delete-account-button @logged-out="logOut"></delete-account-button>
                </p>
              </div>
            </div>
            <div class="column">
              <div class="field is-grouped is-grouped-right">
                <p class="control">
                  <a :class="{'button is-success': true, 'is-loading': onGoingRequest}" id="submit-button"
                     @click="saveDetails">
                    Save
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import BInput from "buefy/src/components/input/Input";
  import ajax from '../utilities/ajax'
  import DeleteAccountButton from "./utility_buttons/DeleteAccountButton"

  export default {
    components: {BInput, DeleteAccountButton},
    name: "my-account",
    data() {
      return {
        username: '',
        email: '',
        oldPassword: '',
        newPassword: '',
        isOldPasswordEmpty: false,
        isNewPasswordEmpty: false,
        showChangePassword: false,
        onGoingRequest: false,
        errorMessage: 'Please enter old password'
      }
    },
    computed: {
      isUsernameEmpty() {
        return this.username === ''
      },
      isEmailEmpty() {
        return this.email === '' || !this.validateEmail()
      }
    },
    methods: {
      logOut() {
        this.$emit('logged-out')
      },
      validateEmail() {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(this.email.toLowerCase());
      },
      validateAll() {
        let baseValidation = !this.isUsernameEmpty && !this.isEmailEmpty;

        if (this.showChangePassword) {
          this.isOldPasswordEmpty = this.oldPassword === '';
          this.isNewPasswordEmpty = this.newPassword === '';
          baseValidation = baseValidation && !this.isOldPasswordEmpty && !this.isNewPasswordEmpty;
        }

        return baseValidation
      },
      saveDetails() {
        if (this.validateAll()) {
          this.onGoingRequest = true;
          let requestData = {
            username: this.username,
            email: this.email,
            changePassword: false
          };

          if (this.showChangePassword) {
            requestData.changePassword = true;
            requestData.oldPassword = this.oldPassword;
            requestData.newPassword = this.newPassword;
          }

          ajax.put('users', requestData, {
            headers: {
              'Authentication-Token': localStorage.getItem('authToken')
            }
          }).then(response => {
            this.onGoingRequest = false;
            this.$toast.open({
              duration: 2000,
              message: 'Details updated',
              position: 'is-bottom',
              type: 'is-success'
            })
          }).catch(error => {
            this.onGoingRequest = false;
            console.log(error.response);
            if (error.response.status === 403) {
              this.errorMessage = error.response.data.message;
              this.isOldPasswordEmpty = true;
            } else {
              this.$toast.open({
                duration: 2000,
                message: 'Looks like there was some error. Please login again',
                position: 'is-bottom',
                type: 'is-danger'
              });
              this.$emit('logged-out')
            }
          })
        }
      }
    },
    mounted: function () {
      const loadingComponent = this.$loading.open();

      ajax.get('users', {
        headers: {
          'Authentication-Token': localStorage.getItem('authToken')
        }
      }).then(response => {
        this.username = response.data.username;
        this.email = response.data.email;
        loadingComponent.close();
      }).catch(() => {
        loadingComponent.close();
        this.$toast.open({
          duration: 2000,
          message: 'Looks like there was some error. Please login again',
          position: 'is-bottom',
          type: 'is-danger'
        });
        this.$emit('logged-out')
      })
    }
  }
</script>

<style scoped>
  #backdrop {
    background: linear-gradient(to left, #B24592, #F15F79);
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    padding-bottom: 2%;
    padding-left: 0.5%;
    padding-right: 0.5%;
    height: 95%;
    overflow-x: hidden;
    overflow-y: visible;
  }

  .box {
    margin-top: 5%;
    -webkit-box-shadow: 0 20px 80px rgba(0, 0, 0, 0.6);
    -moz-box-shadow: 0 20px 80px rgba(0, 0, 0, 0.6);
    box-shadow: 0 20px 80px rgba(0, 0, 0, 0.6);
  }

  .input {
    box-shadow: none;
    font-family: "Lato", Helvetica, sans-serif;
    font-weight: 300;
  }

  #change-password {
    border: none;
    font-size: 0.9em;
  }

  .is-grouped {
    margin-top: 2%;
    margin-bottom: 2%;
  }

  #heading {
    text-align: center;
    color: #F15F79;
    font-family: "Lato", "Helvetica Neue", sans-serif;
    font-size: 3.5em;
    margin-bottom: 2%;
    font-weight: 300;
  }

  .slide-down-enter-active {
    transition: all .5s ease;
  }

  .slide-down-enter, .slide-down-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }

  .slide-fade-enter-active {
    transition: all .5s ease;
  }

  .slide-fade-enter
    /* .slide-fade-leave-active below version 2.1.8 */
  {
    transform: translateY(15px);
    opacity: 0;
  }
</style>
